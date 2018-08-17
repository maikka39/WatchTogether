"""
Created by: Maik de Kruif
"""

from html import escape
from pprint import pprint
from time import gmtime, strftime

import eventlet
import socketio
from flask import Flask, render_template, url_for

sio = socketio.Server()
app = Flask(__name__)
app.debug = True

connections = []
usernames = {}
roomusers = {}


@app.route('/')
def index():
    """Serve the client-side application."""
    return render_template('index.html')


@app.route('/room/')
def roomchooser():
    return render_template('index.html')


@app.route('/room/<string:roomnumber>/', methods=['GET'])
def room(roomnumber):
    return render_template("room.html", roomnum=escape(roomnumber))


@app.errorhandler(404)
def not_found_error(error):
    return render_template('error-pages/404.html'), 404


@sio.on('connect')
def connect(sid, environ):
    # print('connect ', sid, '', environ)
    print('connect ', sid)
    connections.append(str(sid))
    print('connected sockets: ', len(connections))


@sio.on('join room')
def join_room(sid, roomnum, username="Unknown"):
    for room in sio.rooms(sid):
        sio.leave_room(sid, room)
    usernames[str(sid)] = escape(str(username))
    sio.enter_room(sid, roomnum)
    room = str(sio.rooms(sid)[0])
    try:
        roomusers[room].append(usernames[str(sid)])
    except KeyError:
        roomusers[room] = []
        roomusers[room].append(usernames[str(sid)])
    data = roomusers[room]
    sio.emit('get users', data, room=room)


@sio.on('send message')
def send_message(sid, message):
    data = {
        "user": usernames[str(sid)],
        "msg": escape(message),
        "time": strftime("%H:%M", gmtime()),
    }
    sio.emit('new message', data, room=sio.rooms(sid)[0])


@sio.on('play video')
def play_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "state": data["state"],
    }
    sio.emit('play video client', data, room=room)


@sio.on('sync video')
def sync_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "time": data["time"],
        "state": data["state"],
        "videoId": data["videoId"],
    }
    sio.emit('sync video client', data, room=room)


@sio.on('change video')
def change_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "videoId": data["videoId"],
    }
    sio.emit('change video client', data, room=room)


@sio.on('')
def fname(sid):
    pass


@sio.on('')
def fname(sid):
    pass


@sio.on('disconnect')
def disconnect(sid):
    room = str(sio.rooms(sid)[0])
    roomusers[room].remove(usernames[str(sid)])
    sio.emit('get users', roomusers[room], room=room)
    sio.leave_room(sid, room)
    try:
        del(usernames[str(sid)])
        connections.remove(str(sid))
    except:
        pass
    print('disconnect ', sid)
    print('connected sockets: ', len(connections))


if __name__ == '__main__':
    # wrap Flask application with socketio's middleware
    app = socketio.Middleware(sio, app)

    # deploy as an eventlet WSGI server
    listener = eventlet.listen(('0.0.0.0', 8080))
    eventlet.wsgi.server(listener, app)
