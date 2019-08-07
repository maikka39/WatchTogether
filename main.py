#!/usr/bin/env python3
import os

import eventlet
import sass
import socketio
from src import backend, frontend

# if __name__ == '__main__':
print("Compiling SCSS...")
path = os.getcwd() + "/src/frontend/static/scss"
sass.compile(dirname=(path, path + "/compiled"), output_style='compressed')
print("Done compiling SCSS!")

# wrap Flask application with socketio's middleware
app = socketio.Middleware(backend, frontend)

# deploy as an eventlet WSGI server
listener = eventlet.listen(('0.0.0.0', 8080))
eventlet.wsgi.server(listener, app)
