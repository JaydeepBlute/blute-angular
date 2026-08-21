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

def post_to_payload(title, text=""):
    payload = {
        "title": title,
        "text": text or title,
        "status": "posted"
    }

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
            print(f"✅ Created LinkedIn Post: '{title}' (ID: {doc_id})")
            return resp_data
    except Exception as e:
        print(f"❌ Failed to create LinkedIn Post '{title}': {e}")
        return None

def sync_linkedin_posts():
    print("📰 Step 3: Posting Updates to Payload CMS (linkedin-posts)...")
    linkedin_posts = [
        {
            "title": "Blute Technologies - Enterprise Mobility & Cloud Engineering Platform",
            "text": (
                "Blute Technologies Pvt Ltd (Bengaluru, India) is a premier IT services and software engineering company. "
                "We specialize in custom web & mobile app development, enterprise cloud native architecture, staff augmentation, "
                "and industry 4.0 IoT platforms. Our mission is empowering enterprises with high-availability, scalable software "
                "systems built for seamless customer experience and operational excellence."
            )
        },
        {
            "title": "Next-Gen Mobility & Intercity Bus Operations Platform",
            "text": (
                "Introducing our Next-Generation Intercity Bus Operations & Booking Platform! Designed for fleet owners, "
                "travel agencies, and bus operators across India. Key features include: 1) Interactive 2D/3D Sleeper Berth "
                "Seat Selection Engine with real-time locking; 2) Live GPS Telemetry Stream & Geo-fenced SMS passenger boarding alerts; "
                "3) Handheld Android POS Ticketing for conductors with instant QR boarding pass validation; 4) Depot Fleet Operations, "
                "waybill reconciliation, and automated GST invoice compliance."
            )
        },
        {
            "title": "Industrial IoT Telemetry & Equipment Sales & Service Platform",
            "text": (
                "Empower heavy machinery dealers, equipment fleet managers, and industrial OEMs with our unified Equipment "
                "Sales & Service Platform. Features: 1) Spare parts catalog & real-time inventory management; 2) Automated "
                "workshop job cards & preventive maintenance schedules; 3) Live IoT sensor telemetry for fuel mileage variance "
                "and engine health monitoring; 4) Customer service ticket management & warranty claims engine."
            )
        },
        {
            "title": "Agentic AI & Multi-Agent Autonomous Automation Engine",
            "text": (
                "Orchestrate enterprise workflows with Agentic AI! Our autonomous multi-agent platform enables: 1) Declarative "
                "Rules Engine for dynamic business logic; 2) DAG Workflow Execution with fallback retry logic; 3) OpenTelemetry "
                "tracing for sub-second auditability; 4) Seamless integration with legacy enterprise APIs and multi-agent AI coding assistants."
            )
        },
        {
            "title": "Enterprise Cloud Migration & DevSecOps Infrastructure",
            "text": (
                "Accelerate your cloud journey with Blute Technologies' DevSecOps engineering team. We deliver: 1) High-availability "
                "Kubernetes cluster orchestration; 2) Zero-downtime CI/CD automated pipeline deployment; 3) End-to-end security audits "
                "& vulnerability scanning; 4) 24/7 cloud infrastructure monitoring with automated failover."
            )
        }
    ]
    for p in linkedin_posts:
        post_to_payload(p["title"], p.get("text", ""))

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
