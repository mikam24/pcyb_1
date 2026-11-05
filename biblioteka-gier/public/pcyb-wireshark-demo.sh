#!/usr/bin/env bash
set -u

LOG_FILE="${HOME}/Desktop/pcyb_wireshark_demo.txt"
SERVER_URL="http://192.168.56.10:8080/telemetry"
RESPONSE_FILE="$(mktemp)"

{
  echo "PCYB - demonstracja ruchu sieciowego"
  echo "Data: $(date)"
  echo
  echo "[LISTING] Zawartosc katalogu domowego klienta: ${HOME}"
  ls -lah "$HOME" 2>&1 || true
  echo "(Listing obejmuje tylko katalog HOME; zawartosc plikow nie jest odczytywana.)"
  echo
  echo "[KONFIGURACJA SIECIOWA] Nazwa klienta"
  hostname 2>&1 || true
  echo
  echo "[KONFIGURACJA SIECIOWA] Interfejsy i adresy"
  ip -br address 2>&1 || true
  echo
  echo "[KONFIGURACJA SIECIOWA] Trasy"
  ip route 2>&1 || true
  echo
  echo "[KONFIGURACJA SIECIOWA] Serwery DNS"
  if command -v resolvectl >/dev/null 2>&1; then
    resolvectl dns 2>&1 || true
  else
    grep -E '^[[:space:]]*nameserver' /etc/resolv.conf 2>&1 || true
  fi
  echo
  echo "[DNS] Zapytanie do example.com"
  nslookup example.com 2>&1 || true
  echo
  echo "[ICMP] Cztery pakiety ping do example.com"
  ping -c 4 example.com 2>&1 || true
  echo
  echo "[HTTPS] Pobranie naglowkow z https://example.com"
  curl -I --max-time 10 https://example.com 2>&1 || true
  echo
  echo "[POST] Wyslanie logu demonstracyjnego do serwera"
} > "$LOG_FILE"

if curl -sS --fail --max-time 10 \
  -X POST \
  -H "Content-Type: text/plain; charset=utf-8" \
  --data-binary "@${LOG_FILE}" \
  "$SERVER_URL" > "$RESPONSE_FILE" 2>&1; then
  echo "Status wysylki: OK" >> "$LOG_FILE"
else
  {
    echo "Status wysylki: BLAD - sprawdz adres serwera i firewall."
    cat "$RESPONSE_FILE"
  } >> "$LOG_FILE"
fi

rm -f "$RESPONSE_FILE"
echo >> "$LOG_FILE"
echo "Koniec demonstracji. Plik zostal zapisany na pulpicie." >> "$LOG_FILE"

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$LOG_FILE" >/dev/null 2>&1 &
fi

echo "Gotowe. Log: $LOG_FILE"
echo "W Wiresharku filtruj: dns || icmp || tcp.port == 443"
