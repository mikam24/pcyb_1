from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from datetime import datetime, timezone


HOST = "0.0.0.0"
PORT = 8080
MAX_BODY_SIZE = 64 * 1024
OUTPUT_DIR = Path(__file__).with_name("received_telemetry")


class TelemetryHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/health":
            self.send_error(404)
            return

        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"telemetry server is running\n")

    def do_POST(self):
        if self.path != "/telemetry":
            self.send_error(404)
            return

        content_length = self.headers.get("Content-Length")
        if content_length is None:
            self.send_error(411, "Content-Length is required")
            return

        try:
            body_size = int(content_length)
        except ValueError:
            self.send_error(400, "Invalid Content-Length")
            return

        if body_size < 1 or body_size > MAX_BODY_SIZE:
            self.send_error(413, "Telemetry payload is too large")
            return

        body = self.rfile.read(body_size)
        OUTPUT_DIR.mkdir(exist_ok=True)
        filename = datetime.now(timezone.utc).strftime("telemetry_%Y%m%dT%H%M%SZ.txt")
        (OUTPUT_DIR / filename).write_bytes(body)

        self.send_response(202)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"telemetry accepted\n")

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")


if __name__ == "__main__":
    print(f"Listening on http://{HOST}:{PORT}")
    print(f"Received logs are saved in {OUTPUT_DIR}")
    ThreadingHTTPServer((HOST, PORT), TelemetryHandler).serve_forever()
