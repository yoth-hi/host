from http.server import BaseHTTPRequestHandler
from os.path import join, exists, isfile
from urllib.parse import urlparse, unquote
from jinja2 import Template
from .controller import renderContextPage, isPageHtml, isPageApi
import os
import re
import random
import brotli



compression_quelity = random.randint(0, 5)
current_directory = os.getcwd()
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        if isPageHtml(path):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.send_header('Content-Encoding', 'br')
            self.send_header('compressed', f"{compression_quelity}")
            self.end_headers()
            with open(join(current_directory, 'frontend', 'desktop', 'index.html'), 'rb') as f:
                context = renderContextPage(parsed_path, self);
                template = Template(re.sub(r'\n| {2,}', ' ', f.read().decode('utf-8')));
                render = template.render(context)
                compressed_content = brotli.compress(render.encode('utf-8'), quality=compression_quelity)
                self.wfile.write(compressed_content)
        elif isPageApi(path):
            self.send_header('Content-type', 'text/plain')
        else:
            self.serve_static(path)
        return
    
    def serve_static(self, path):
        # Construct full path to the requested file
        file_path = join(current_directory, "frontend", path[3:])
        if exists(file_path) and os.path.isfile(file_path):
            # Determine the content type based on file extension (simplified for demonstration)
            content_type = 'text/plain'
            if path.endswith('.js'):
                content_type = 'application/javascript'
            elif path.endswith('.css'):
                content_type = 'text/css'
            elif path.endswith('.html'):
                content_type = 'text/html; charset=utf-8'

            # Send headers and file content
            self.send_response(200)
            self.send_header('Content-type', content_type)
            self.send_header('Content-Encoding', 'br')
            self.end_headers()
            with open(file_path, 'rb') as f:
                compressed_content = brotli.compress(f.read(), quality=compression_quelity)
                self.wfile.write(compressed_content)
        else:
            self.send_error(404, "File not found")
