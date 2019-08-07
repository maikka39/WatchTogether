import html

import socketio

sio = socketio.Server()

connections = []
usernames = {}
roomusers = {}


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
    usernames[str(sid)] = html.escape(str(username))
    sio.enter_room(sid, roomnum)
    room = str(sio.rooms(sid)[0])
    if type(roomusers.get(room)) == list:
        roomusers[room].append(usernames.get(str(sid), "Unknown"))
    else:
        roomusers[room] = []
        roomusers[room].append(usernames.get(str(sid), "Unknown"))
    data = roomusers.get(room)
    sio.emit('get users', data, room=room)


@sio.on('send message')
def send_message(sid, message):
    data = {
        "user": usernames.get(str(sid)),
        "msg": html.escape(message),
        "time": strftime("%H:%M", gmtime()),
    }
    sio.emit('new message', data, room=sio.rooms(sid)[0])


@sio.on('play video')
def play_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "state": data.get("state", ""),
    }
    sio.emit('play video client', data, room=room)


@sio.on('sync video')
def sync_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "time": data.get("time"),
        "state": data.get("state"),
        "videoId": data.get("videoId"),
    }
    sio.emit('sync video client', data, room=room)


@sio.on('change video')
def change_video(sid, data):
    room = str(sio.rooms(sid)[0])
    data = {
        "videoId": data.get("videoId"),
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
    if room in roomusers:
        roomusers[room].remove(usernames.get(str(sid)))
    sio.emit('get users', roomusers.get(room), room=room)
    for uroom in sio.rooms(sid):
        sio.leave_room(sid, uroom)
    if str(sid) in usernames:
        del(usernames[str(sid)])
        connections.remove(str(sid))
    print('disconnect ', sid)
    print('connected sockets: ', len(connections))
