from .connector import SSHConnector


class CertbotRunner:
    def __init__(self, connector: SSHConnector, nginx_sites_path: str = "/etc/nginx/sites-available", authenticator: str = "nginx"):
        self.ssh = connector
        self.nginx_sites_path = nginx_sites_path.rstrip("/")
        self.authenticator = authenticator

    def _run(self, command: str) -> tuple[str, str, int]:
        out, err, code = self.ssh.run(command)
        print(f"$ {command}")
        print("─" * 60)
        if out:
            print(out)
        if err:
            print(f"[stderr] {err}")
        print(f"exit: {code}\n")
        return out, err, code

    def check_nginx_config(self, site: str) -> str:
        out, _, _ = self._run(f"cat {self.nginx_sites_path}/{site}")
        return out

    def verify_dns(self, domain: str) -> str:
        out, _, _ = self._run(f"dig +short {domain}")
        return out

    def certbot_version(self) -> str:
        out, _, _ = self._run("certbot --version")
        return out

    def issue_certificate(self, domains: list[str], email: str | None = None) -> int:
        domain_flags = " ".join(f"-d {d}" for d in domains)
        email_flag = f"--email {email}" if email else "--register-unsafely-without-email"
        _, _, code = self._run(
            f"certbot --{self.authenticator} {domain_flags} "
            f"--non-interactive --agree-tos {email_flag}"
        )
        return code

    def renew_certificate(self, domains: list[str] | None = None, force: bool = False) -> int:
        force_flag = "--force-renewal" if force else ""
        if domains:
            domain_flags = " ".join(f"-d {d}" for d in domains)
            _, _, code = self._run(f"certbot certonly --{self.authenticator} {domain_flags} --non-interactive {force_flag}".strip())
        else:
            _, _, code = self._run(f"certbot renew {force_flag}".strip())
        return code

    def list_certificates(self) -> str:
        out, _, _ = self._run("certbot certificates")
        return out

    def validate_nginx(self) -> int:
        _, _, code = self._run("nginx -t")
        return code

    def reload_nginx(self) -> int:
        _, _, code = self._run("systemctl reload nginx")
        return code
