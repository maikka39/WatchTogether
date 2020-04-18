var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player;
let playerStatus = -1;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  document.getElementById('ytplayer').style.outlineColor = '#FF6D00'; // Make the outline orange
}

function changeBorderColor(playerStatus) {
  let color;
  if (playerStatus == -1) {
    color = "#37474F"; // unstarted = gray
  } else if (playerStatus == 0) {
    color = "#FFFF00"; // ended = yellow
  } else if (playerStatus == 1) {
    color = "#33691E"; // playing = green
  } else if (playerStatus == 2) {
    color = "#DD2C00"; // paused = red
  } else if (playerStatus == 3) {
    color = "#AA00FF"; // buffering = purple
  } else if (playerStatus == 5) {
    color = "#FF6DOO"; // video cued = orange
  }
  if (color) {
    document.getElementById('ytplayer').style.outlineColor = color;
  }
}

function onPlayerStateChange(event) {
  changeBorderColor(event.data);
  //socket.emit('player status', event.data);
  playerStatus = event.data;

}

function youtube_parser(url) {
  url = String(url)
  if (url.length === 11) {
    return String(url);
  }
  let regExp = /(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)/;
  let match = url.match(regExp);
  return (match && match[1].length == 11) ? match[1] : false;
}
