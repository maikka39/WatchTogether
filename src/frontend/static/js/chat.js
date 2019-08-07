// Chat stuff
$(function() {
  //var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $messages = $('#messages');
  // var $username = $('#username');
  // var $roomnum = $('#roomnum');

  $messageForm.submit(function(e) {
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', function(data) {
    let utctime = data.time
    let time = new Date(utctime).toTimeString().substring(0,5);
    $messages.append(
      '<div class="message"><strong>' + data.user + '</strong>: ' +
      data.msg + '<span class="timestamp">' + time + '</span></div>'
    );
  });
});
