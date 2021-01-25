import { socket } from "./socket"

class Control {
    play(progress) {
        socket.emit("play", { progress })
    }
    pause(progress) {
        socket.emit("pause", { progress })
    }
    sync(url, progress, playing) {
        socket.emit("sync", { url, progress, playing })
    }
    changeVideo(url, callback) {
        socket.emit("changeVideo", { url: url }, () => {
            callback();
        });
    }
    join(roomId, name) {
        socket.emit("join", { room: roomId, name }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }
}

export let control = new Control()
