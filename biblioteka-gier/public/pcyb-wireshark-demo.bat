@echo off
setlocal

set "LOG_FILE=%USERPROFILE%\Desktop\pcyb_wireshark_demo.txt"
set "SERVER_URL=http://192.168.56.10:8080/telemetry"
set "RESPONSE_FILE=%TEMP%\pcyb_wireshark_response.txt"

echo PCYB - demonstracja ruchu sieciowego > "%LOG_FILE%"
echo Data: %date% %time% >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"
echo [DNS] Zapytanie do example.com >> "%LOG_FILE%"
nslookup example.com >> "%LOG_FILE%" 2>&1
echo. >> "%LOG_FILE%"
echo [ICMP] Cztery pakiety ping do example.com >> "%LOG_FILE%"
ping -n 4 example.com >> "%LOG_FILE%" 2>&1
echo. >> "%LOG_FILE%"
echo [HTTPS] Pobranie naglowkow z https://example.com >> "%LOG_FILE%"
curl.exe -I --max-time 10 https://example.com >> "%LOG_FILE%" 2>&1
echo. >> "%LOG_FILE%"
echo [POST] Wyslanie logu demonstracyjnego do serwera >> "%LOG_FILE%"
curl.exe -sS --fail --max-time 10 -X POST -H "Content-Type: text/plain; charset=utf-8" --data-binary "@%LOG_FILE%" "%SERVER_URL%" > "%RESPONSE_FILE%" 2>&1
if errorlevel 1 (
    echo Status wysylki: BLAD - sprawdz adres serwera i firewall. >> "%LOG_FILE%"
    type "%RESPONSE_FILE%" >> "%LOG_FILE%"
) else (
    echo Status wysylki: OK >> "%LOG_FILE%"
)
del /q "%RESPONSE_FILE%" >nul 2>&1
echo. >> "%LOG_FILE%"
echo Koniec demonstracji. Plik zostal zapisany na pulpicie. >> "%LOG_FILE%"

start "" notepad.exe "%LOG_FILE%"
echo.
echo Gotowe. Log: "%LOG_FILE%"
echo W Wiresharku filtruj: dns ^|^| icmp ^|^| tcp.port == 443
pause
