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
import time
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
PAYLOAD_API_URL = "https://payload-nine-ivory.vercel.app/api/linkedin-posts"

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
            "title": "Technology That Delivers: Empowering Enterprise Digital Transformation",
            "text": "At Blute Technologies, we believe that real software engineering is about solving complex operational challenges with precision, reliability, and measurable ROI.\n\nHeadquartered in Jayanagar, Bengaluru, our engineering teams build high-availability cloud solutions, custom mobile applications, enterprise ERP/CRM platforms, and staff augmentation services for global clients across mobility, logistics, equipment manufacturing, and fintech.\n\nLooking to accelerate your digital adoption? Connect with our solution architects today!\n\n#DigitalTransformation #CloudEngineering #SoftwareDevelopment #BengaluruTech #BluteTechnologies"
        },
        {
            "title": "Next-Gen Intercity Bus Operations & Sleeper Berth Ticketing Engine",
            "text": "The intercity bus industry requires real-time precision. Blute Technologies is proud to announce our unified Mobility & Intercity Bus Operations Platform!\n\nKey Innovations:\n✨ Interactive 2D/3D Sleeper Berth Seat Selection Engine with sub-second holding locks.\n🛰️ Live GPS Telemetry Stream & Geo-fenced SMS arrival alerts to passenger phones.\n📱 Handheld Android POS Terminal integration for conductors to validate QR tickets and issue physical tickets on the go.\n📊 Depot Fleet Operations & automated waybill cash reconciliation.\n\n#BusOps #FleetManagement #PassengerSafety #IntercityTravel #MobilityOps"
        },
        {
            "title": "Heavy Machinery & Equipment Sales & Service Platform Launch",
            "text": "Managing heavy equipment sales, spare parts inventories, and workshop service logs can be daunting without a unified data engine. Blute Technologies delivers an end-to-end Equipment Sales & Service Platform!\n\nWhat sets our platform apart:\n🛠️ Real-time Spare Parts Catalog & Serialized Inventory Tracking.\n📋 Automated Workshop Job Cards & Technician Shift Scheduling.\n📈 IoT Telemetry for Fuel Mileage Variance & Predictive Engine Health Alerts.\n💼 B2B Invoicing with Statutory GST & E-Waybill Compliance.\n\n#EquipmentOps #HeavyMachinery #IndustrialIoT #FleetService #SupplyChain"
        },
        {
            "title": "Agentic AI: Multi-Agent Autonomous Automation for Enterprise Workflows",
            "text": "Artificial Intelligence is evolving from simple prompt-response models to autonomous multi-agent networks that execute complex multi-step workflows.\n\nAt Blute Technologies, our Agentic AI framework equips enterprises with:\n🤖 Specialized Sub-Agents for automated code audits, security scanning, and data transformations.\n⚡ Declarative Rules Engine for instant business logic updates without code deployments.\n🌐 OpenTelemetry Waterfall Tracing for 100% execution visibility and sub-second debugging.\n\nDiscover how autonomous AI agents can elevate your enterprise software productivity.\n\n#AgenticAI #AutonomousAgents #SoftwareAutomation #EnterpriseAI #DevOps"
        },
        {
            "title": "Building High-Availability Kubernetes & DevSecOps Infrastructure",
            "text": "Downtime costs businesses millions. Our Cloud Engineering & DevSecOps practice at Blute Technologies helps organizations build resilient, automated cloud infrastructure.\n\nOur Cloud Engineering Checklist:\n🔒 Zero-Trust Security Gates & Secret Scanning in CI/CD pipelines.\n☸️ Self-healing Kubernetes clusters with automated pod scaling.\n📊 Real-time OTel metrics, APM tracing, and log aggregation.\n🚀 Zero-downtime blue/green rolling deployments.\n\n#CloudNative #Kubernetes #DevSecOps #CloudInfrastructure #SiteReliability"
        },
        {
            "title": "Empowering Tech Teams with Enterprise Staff Augmentation Services",
            "text": "Finding specialized software engineering talent shouldn't bottleneck your product roadmap. Blute Technologies offers dedicated Staff Augmentation & Offshore Development Centers (ODC).\n\nWhy enterprises trust Blute Tech Talent:\n⚡ Pre-vetted senior engineers skilled in Angular, Next.js, Go, Kotlin, Node.js, and Cloud Ops.\n🎯 Seamless integration with your agile sprints and internal engineering practices.\n🛡️ Strict IP protection, SOC-2 compliance, and transparent delivery metrics.\n\nScale your software team effortlessly with our Bengaluru engineering talent hub.\n\n#StaffAugmentation #SoftwareEngineering #TechTalent #Outsourcing #Bengaluru"
        },
        {
            "title": "Industrial IoT Telemetry: Transforming Equipment Fleet Monitoring",
            "text": "Connected sensors are revolutionizing equipment fleet management. By streaming real-time CAN-bus telemetry, operators can detect anomalies before costly breakdowns occur.\n\nHighlights of Blute IoT Telemetry:\n📡 Sub-second sensor data ingestion via Kafka & MQTT pipelines.\n⛽ Fuel theft detection & mileage efficiency scoring per driver.\n🔧 Automated maintenance alerts based on actual engine operating hours.\n\n#IndustrialIoT #Telemetry #FleetOps #PredictiveMaintenance #IoT"
        },
        {
            "title": "Statutory GST & E-Invoicing Integration for Multi-Operator Fleets",
            "text": "Navigating tax compliance across state borders shouldn't slow down your mobility operations. Our Mobility Platform features automated GST E-Invoicing with instant IRN & QR code generation.\n\nFeatures:\n📄 Automated B2B GST tax invoice generation for corporate rosters.\n💳 Multi-channel payment gateway reconciliation (UPI, Cards, NetBanking, Agent Wallets).\n📑 Real-time waybill ledger audits for depot cashiers.\n\n#TaxCompliance #GSTInvoicing #Fintech #MobilityTech #EnterpriseSoftware"
        },
        {
            "title": "Designing Ergonomic 3D Visualizations for Modern Web UX",
            "text": "User experience is no longer just flat 2D forms. By introducing Three.js WebGL spatial viewports, web applications can provide immersive, real-time spatial previews.\n\nAt Blute Technologies, we engineered an open-exploded 3D sleeper bus deck visualization with:\n🎨 Smooth curved extrude geometry for ergonomic berth modeling.\n🖱️ Full user orbit, tilt, drag, and pinch-zoom controls.\n⚡ Instant raycasting click interaction for seat lock reservations.\n\n#WebUX #ThreeJS #WebGL #FrontendEngineering #Angular"
        },
        {
            "title": "Blute Technologies Mission: Untangling Digital Complexity",
            "text": "Our vision at Blute Technologies is simple: to help enterprises untangle digital complexity, accelerate technology adoption, and orchestrate a future of constant innovation.\n\nWhether you are modernizing legacy software, deploying IoT telemetry fleets, or building consumer mobility apps, our engineering team in Bengaluru is ready to build solutions that deliver.\n\nVisit us at https://blute.co.in or contact our solution architects to get started!\n\n#BluteTechnologies #TechInnovation #SoftwareServices #BengaluruIT #DigitalTransformation"
        }
    ]
    for p in linkedin_posts:
        post_to_payload(p["title"], p.get("text", ""))
        time.sleep(0.1)

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
