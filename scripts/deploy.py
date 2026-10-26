#!/usr/bin/env python3
"""
Automated Build & Deployment Script for Blute Angular Site (blute.org)
Target: bluteadmin@161.97.133.83 -> /var/www/blute-org

Usage:
  python3 deploy.py
  python3 deploy.py --skip-build
  ./deploy.sh
"""

import sys
import os
import io
import time
import tarfile
import argparse
import subprocess
import urllib.request
import ssl

try:
    import paramiko
except ImportError:
    print("Installing paramiko...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paramiko"])
    import paramiko

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ANGULAR_DIR = os.path.join(BASE_DIR, "blute-angular")
DIST_DIR = os.path.join(ANGULAR_DIR, "dist/blute-app/browser")
KEY_PATH = os.path.join(BASE_DIR, "server-cread/bluteadmin_key")
KEY_PASSPHRASE = "@dmin@5142"
SERVER_IP = "161.97.133.83"
SERVER_USER = "bluteadmin"
REMOTE_WEB_DIR = "/var/www/blute-org"


def build_angular():
    print("🔨 Step 1: Building Angular Production Bundle...")
    if not os.path.isdir(ANGULAR_DIR):
        print(f"❌ Error: Angular directory not found at {ANGULAR_DIR}")
        sys.exit(1)

    cmd = ["npm", "run", "build"]
    res = subprocess.run(cmd, cwd=ANGULAR_DIR)
    if res.returncode != 0:
        print("❌ Error: Angular build failed!")
        sys.exit(res.returncode)
    print("✅ Angular Production Build Complete!")


def create_tar_archive():
    print("📦 Step 2: Creating tar.gz in memory from build output...")
    if not os.path.exists(DIST_DIR):
        print(f"❌ Error: Dist directory {DIST_DIR} does not exist. Run build first.")
        sys.exit(1)

    tar_buffer = io.BytesIO()
    with tarfile.open(fileobj=tar_buffer, mode="w:gz") as tar:
        tar.add(DIST_DIR, arcname=".")
    tar_buffer.seek(0)
    data = tar_buffer.read()
    print(f"✅ Archive created ({len(data)} bytes, ~{len(data)/(1024*1024):.2f} MB)")
    return data


def deploy_to_server(archive_bytes):
    print(f"🚀 Step 3: Connecting to {SERVER_USER}@{SERVER_IP} via SSH...")
    if not os.path.exists(KEY_PATH):
        print(f"❌ Error: Key file {KEY_PATH} not found.")
        sys.exit(1)

    pkey = paramiko.Ed25519Key.from_private_key_file(KEY_PATH, password=KEY_PASSPHRASE)
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(SERVER_IP, username=SERVER_USER, pkey=pkey, timeout=15)

    remote_tar = "/tmp/blute-angular-build.tar.gz"
    print(f"⬆️  Uploading build archive to server ({remote_tar})...")
    sftp = ssh.open_sftp()
    with sftp.open(remote_tar, "wb") as f:
        f.write(archive_bytes)
    sftp.close()

    print("🔄 Backing up current deployment and extracting new build...")
    deploy_command = f"""
set -e
BACKUP_DIR=/home/{SERVER_USER}/blute-org-backup-$(date +%Y%m%d-%H%M%S)
if [ -d "{REMOTE_WEB_DIR}" ] && [ "$(ls -A {REMOTE_WEB_DIR})" ]; then
    cp -r {REMOTE_WEB_DIR} "$BACKUP_DIR"
    echo "Backup created at $BACKUP_DIR"
fi

rm -rf {REMOTE_WEB_DIR}/*
tar -xzf {remote_tar} -C {REMOTE_WEB_DIR}/
rm -f {remote_tar}
echo "Listing extracted files in {REMOTE_WEB_DIR}:"
ls -la {REMOTE_WEB_DIR}/ | head -n 15
"""
    stdin, stdout, stderr = ssh.exec_command(deploy_command)
    exit_status = stdout.channel.recv_exit_status()
    out = stdout.read().decode()
    err = stderr.read().decode()

    if exit_status != 0:
        print(f"❌ Remote deployment failed with code {exit_status}:")
        print(err)
        sys.exit(exit_status)

    print(out.strip())
    ssh.close()
    print("✅ Remote extraction complete!")


def verify_site():
    print("🌐 Step 4: Verifying https://blute.org...")
    ctx = ssl.create_default_context()
    req = urllib.request.Request("https://blute.org", headers={"User-Agent": "DeployVerification/1.0"})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            code = response.getcode()
            headers = dict(response.info())
            body_sample = response.read(1024).decode(errors="ignore")
            print(f"✅ Status Code: {code}")
            print(f"   Server: {headers.get('Server', 'unknown')}")
            print(f"   Last-Modified: {headers.get('Last-Modified', 'unknown')}")
            print("🚀 Site is LIVE and healthy!")
    except Exception as e:
        print(f"⚠️ Warning: Could not verify public site directly: {e}")


def main():
    parser = argparse.ArgumentParser(description="Build and deploy Blute Angular website.")
    parser.add_argument("--skip-build", action="store_true", help="Skip npm run build step")
    args = parser.parse_args()

    start_time = time.time()
    if not args.skip_build:
        build_angular()

    archive_data = create_tar_archive()
    deploy_to_server(archive_data)
    verify_site()

    elapsed = time.time() - start_time
    print(f"\n🎉 Everything deployed successfully in {elapsed:.1f}s!")


if __name__ == "__main__":
    main()
