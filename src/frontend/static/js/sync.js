// Syncs the video client
socket.on('sync video client', function(data) {
  if (youtube_parser(player.getVideoUrl()) != data.videoId) {
    changeVideo(data.videoId)
  }
  player.seekTo(data.time);

  // Sync player state
  if (data.state == -1 || data.state == 2)
    player.pauseVideo();
  else
    player.playVideo();
});

// Change video
socket.on('change video client', function(data) {
  // This changes the video
  player.loadVideoById(data.videoId);
  player.seekTo(0);
});

// Play/Pause video
socket.on('play video client', function(data) {
  // Play/Pause the video
  if (data.state == -1 || data.state == 2)
    player.pauseVideo();
  else
    player.playVideo();
});
