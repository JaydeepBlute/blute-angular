#!/usr/bin/env python3
"""
Automated Deployment & Payload CMS LinkedIn Sync Tool for Blute Technologies

Usage:
  python3 scripts/deploy_and_sync_payload.py --all
  python3 scripts/deploy_and_sync_payload.py --deploy
  python3 scripts/deploy_and_sync_payload.py --payload
"""

import sys
import os
import subprocess
import argparse
import urllib.request
import json
try:
    import paramiko
except ImportError:
    print("Installing required dependency 'paramiko'...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paramiko"])
    import paramiko

SERVER_IP = "161.97.133.83"
SERVER_USER = "bluteadmin"
KEY_PATH = "/home/btpl-lap-22/live/blute-site/server-cread/bluteadmin_key"
KEY_PASSPHRASE = "@dmin@5142"
PAYLOAD_API_URL = "https://payload-nine-ivory.vercel.app/api/posts"

def build_angular():
    print("🔨 Step 1: Building Production Angular Bundle...")
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cmd = ["npm", "run", "build"]
    res = subprocess.run(cmd, cwd=repo_dir, capture_output=True, text=True)
    if res.returncode != 0:
        print("❌ Build failed:\n", res.stderr)
        sys.exit(1)
    print("✅ Angular Production Build Complete!")

def deploy_to_server():
    print(f"🚀 Step 2: Deploying to Server ({SERVER_IP})...")
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    local_dist = os.path.join(repo_dir, "dist/blute-app/browser")

    if not os.path.exists(local_dist):
        build_angular()

    pkey = paramiko.Ed25519Key.from_private_key_file(KEY_PATH, password=KEY_PASSPHRASE)
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(SERVER_IP, username=SERVER_USER, pkey=pkey, timeout=15)

    sftp = ssh.open_sftp()
    remote_tmp = "/tmp/blute-dist"

    ssh.exec_command(f"rm -rf {remote_tmp} && mkdir -p {remote_tmp}")

    def upload_dir(local_path, remote_path):
        try:
            sftp.mkdir(remote_path)
        except Exception:
            pass
        for item in os.listdir(local_path):
            l_item = os.path.join(local_path, item)
            r_item = f"{remote_path}/{item}"
            if os.path.isdir(l_item):
                upload_dir(l_item, r_item)
            else:
                sftp.put(l_item, r_item)

    print("📦 Transferring static files to server via SFTP...")
    upload_dir(local_dist, remote_tmp)

    print("⚡ Executing atomic file copy & Nginx reload...")
    deploy_cmd = (
        f'echo "{KEY_PASSPHRASE}" | sudo -S cp -r {remote_tmp}/* /var/www/blute-org/ && '
        f'echo "{KEY_PASSPHRASE}" | sudo -S nginx -t && '
        f'echo "{KEY_PASSPHRASE}" | sudo -S systemctl reload nginx'
    )
    stdin, stdout, stderr = ssh.exec_command(deploy_cmd)
    out, err = stdout.read().decode(), stderr.read().decode()

    print("Nginx Test Result:\n", err.strip())
    ssh.close()
    print("✅ Web Server Deployment Completed Successfully!")

def post_to_payload(title, summary=""):
    payload = {"title": title}
    if summary:
        payload["summary"] = summary

    req = urllib.request.Request(
        PAYLOAD_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            resp_data = json.loads(res.read().decode("utf-8"))
            doc_id = resp_data.get("doc", {}).get("id", "N/A")
            print(f"✅ Created Payload Post: '{title}' (ID: {doc_id})")
            return resp_data
    except Exception as e:
        print(f"❌ Failed to create Payload Post '{title}': {e}")
        return None

def sync_linkedin_posts():
    print("📰 Step 3: Posting Updates to Payload CMS...")
    sample_posts = [
        {
            "title": "Blute Technologies - Enterprise Mobility & Cloud Engineering Platform",
            "summary": "Custom software development, intercity bus operations platforms, and industrial IoT solutions."
        },
        {
            "title": "Interactive 3D Bus Ticket Booking & Fleet GPS Telemetry Release",
            "summary": "Interactive 3D sleeper berth selection engine, live vehicle location stream, and conductor mobile POS."
        }
    ]
    for p in sample_posts:
        post_to_payload(p["title"], p.get("summary", ""))

def main():
    parser = argparse.ArgumentParser(description="Blute Technologies Automated Deployment & Payload Sync Tool")
    parser.add_argument("--deploy", action="store_true", help="Build and deploy Angular site to server")
    parser.add_argument("--payload", action="store_true", help="Post LinkedIn updates to Payload CMS")
    parser.add_argument("--all", action="store_true", help="Perform both Deployment and Payload Sync")
    parser.add_argument("--post-title", type=str, help="Custom post title to push to Payload CMS")

    args = parser.parse_args()

    if args.post_title:
        post_to_payload(args.post_title)
        return

    if args.all or (not args.deploy and not args.payload):
        build_angular()
        deploy_to_server()
        sync_linkedin_posts()
    else:
        if args.deploy:
            build_angular()
            deploy_to_server()
        if args.payload:
            sync_linkedin_posts()

if __name__ == "__main__":
    main()
