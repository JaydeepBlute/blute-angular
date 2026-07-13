import argparse
import sys
from vps_ssl_tool import SSHConnector, CertbotRunner


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="vps-ssl-tool",
        description="Provision SSL certificates on a remote VPS via SSH using Let's Encrypt."
    )
    parser.add_argument("--host",        required=True,  help="VPS IP address or hostname")
    parser.add_argument("--user",        default="root", help="SSH username (default: root)")
    parser.add_argument("--password",    required=True,  help="SSH password")
    parser.add_argument("--port",        type=int, default=22, help="SSH port (default: 22)")
    parser.add_argument("--domains",     nargs="+",      help="Domains to issue/renew SSL for")
    parser.add_argument("--email",       default=None,   help="Email for Let's Encrypt (optional)")
    parser.add_argument("--check",       nargs="*",      help="Nginx site configs to inspect")
    parser.add_argument("--dry-run",          action="store_true", help="Inspect and verify only, skip issuance")
    parser.add_argument("--renew",             action="store_true", help="Renew existing certificates instead of issuing new ones")
    parser.add_argument("--force",             action="store_true", help="Force renewal even if cert is not near expiry (use with --renew)")
    parser.add_argument("--list-certs",        action="store_true", help="List all certificates on the VPS and exit")
    parser.add_argument("--nginx-sites-path",  default="/etc/nginx/sites-available", help="Remote path to Nginx sites-available directory (default: /etc/nginx/sites-available)")
    parser.add_argument("--authenticator",     default="nginx",     choices=["nginx", "apache", "standalone"], help="Certbot authenticator plugin (default: nginx)")
    parser.add_argument("--timeout",           type=int, default=30, help="SSH command timeout in seconds (default: 30)")
    return parser.parse_args()


def main():
    args = parse_args()

    print(f"\nConnecting to {args.user}@{args.host}:{args.port} ...")

    try:
        with SSHConnector(args.host, args.user, args.password, port=args.port, timeout=args.timeout) as ssh:
            print("Connected.\n")
            runner = CertbotRunner(ssh, nginx_sites_path=args.nginx_sites_path, authenticator=args.authenticator)

            if args.list_certs:
                runner.list_certificates()
                return

            if args.check:
                for site in args.check:
                    runner.check_nginx_config(site)

            if args.domains:
                for domain in args.domains:
                    runner.verify_dns(domain)

            runner.certbot_version()

            if args.dry_run:
                print("Dry run complete. Skipping certificate issuance.")
                return

            if args.renew:
                code = runner.renew_certificate(domains=args.domains, force=args.force)
                if code != 0:
                    print("Certificate renewal failed.")
                    sys.exit(1)
                print(f"\nDone! Certificates renewed for: {', '.join(args.domains) if args.domains else 'all'}")
            else:
                if not args.domains:
                    print("--domains is required when issuing a new certificate.")
                    sys.exit(1)
                code = runner.issue_certificate(args.domains, email=args.email)
                if code != 0:
                    print("SSL issuance failed.")
                    sys.exit(1)
                print(f"\nDone! SSL is now active for: {', '.join(args.domains)}")

            runner.validate_nginx()
            runner.reload_nginx()

            if args.check:
                for site in args.check:
                    runner.check_nginx_config(site)

    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
