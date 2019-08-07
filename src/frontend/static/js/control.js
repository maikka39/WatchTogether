// Plays/Pauzes the video
function playVideo() {
  let state;
  if (playerStatus == -1 || playerStatus == 2)
    state = 1;
  else
    state = 2;
  data = {
    state: state,
  };
  socket.emit('play video', data)
}

// Calls the sync function on the server
function syncVideo(
  time = player.getCurrentTime(),
  state = playerStatus,
  videoId = youtube_parser(player.getVideoUrl())
) {
  socket.emit('sync video', {
    time: time,
    state: state,
    videoId: videoId,
  });
}

// Calls the change video function on the server
function changeVideo(videoId = document.getElementById("inputVideoId").value) {
  socket.emit('change video', {
    videoId: youtube_parser(videoId)
  });
}
