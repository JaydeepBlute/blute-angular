# vps_ssl_tool

A dynamic Python CLI tool to provision and configure SSL certificates on any remote VPS via SSH using Let's Encrypt (Certbot).

---

## Structure

```
tools/
├── main.py                   ← CLI entry point
└── vps_ssl_tool/
    ├── __init__.py
    ├── connector.py          ← SSH connection & command execution
    └── certbot.py            ← Certbot & Nginx operations
```

---

## Requirements

- Python 3.10+
- `paramiko` library

```bash
pip install paramiko
```

---

## Usage

```bash
cd tools/
python3 main.py --host <IP> --password <PASSWORD> --domains <DOMAIN1> [DOMAIN2 ...]
```

---

## All Arguments

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `--host` | ✅ | — | VPS IP address or hostname |
| `--password` | ✅ | — | SSH password |
| `--domains` | ✅ | — | One or more domains to issue SSL for |
| `--user` | ❌ | `root` | SSH username |
| `--port` | ❌ | `22` | SSH port |
| `--email` | ❌ | None | Email for Let's Encrypt notifications |
| `--check` | ❌ | None | Nginx site config names to inspect |
| `--nginx-sites-path` | ❌ | `/etc/nginx/sites-available` | Remote path to Nginx sites directory |
| `--dry-run` | ❌ | False | Inspect & verify only, skip SSL issuance |

---

## Examples

**Basic — issue SSL for blute.org:**
```bash
python3 main.py \
  --host 161.97.133.83 \
  --password Blute2026 \
  --domains blute.org www.blute.org
```

**With email for renewal reminders:**
```bash
python3 main.py \
  --host 161.97.133.83 \
  --password Blute2026 \
  --domains blute.org www.blute.org \
  --email admin@blute.org
```

**Inspect configs before & after without touching mattermost:**
```bash
python3 main.py \
  --host 161.97.133.83 \
  --password Blute2026 \
  --domains blute.org www.blute.org \
  --check blute-org
```

**Dry run — only check DNS and configs, do not issue cert:**
```bash
python3 main.py \
  --host 161.97.133.83 \
  --password Blute2026 \
  --domains blute.org www.blute.org \
  --dry-run
```

**Custom SSH port and non-root user:**
```bash
python3 main.py \
  --host 161.97.133.83 \
  --user deploy \
  --password mypassword \
  --port 2222 \
  --domains example.com www.example.com
```

---

## What It Does

| Step | Action |
|------|--------|
| 1 | Connects to VPS via SSH |
| 2 | Inspects specified Nginx configs (`--check`) |
| 3 | Verifies DNS for each domain resolves to VPS |
| 4 | Checks Certbot is installed |
| 5 | Issues SSL cert via Let's Encrypt for given domains |
| 6 | Validates Nginx config with `nginx -t` |
| 7 | Reloads Nginx to apply changes |

---

## Safety

- Only modifies Nginx configs for the domains you pass via `--domains`.
- Any config not listed in `--check` is **never read or written**.
- Use `--dry-run` to safely verify without making changes.
- Auto-renewal is handled by Certbot's systemd timer after first run.
