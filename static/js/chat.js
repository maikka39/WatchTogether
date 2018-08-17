// Chat stuff
$(function() {
  //var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $messages = $('#messages');
  var $roomArea = $('#roomArea');
  var $userFormArea = $('#userFormArea');
  var $userForm = $('#userForm');
  var $users = $('#users');
  var $usercounter = $('#usercounter');
  var $username = $('#username');
  var $roomnum = $('#roomnum');

  $messageForm.submit(function(e) {
    e.preventDefault();
    // console.log("Submitted");
    socket.emit('send message', $message.val());
    $message.val('');
  });

  socket.on('new message', function(data) {
    $messages.append('<div class="message"><strong>' + data.user + '</strong>: ' + data.msg + '<span class="timestamp">' + data.time + '</span></div>');
  });

  // Submit user form
  $userForm.submit(function(e) {
    e.preventDefault();
    // console.log("Submitted");
    // New User
    socket.emit('new user', $username.val(), function(data) {
      if (data) {
        $userFormArea.hide();
        $roomArea.show();
      }
    });
    // Join room
    socket.emit('new room', $roomnum.val(), function(data) {
      if (data) {
        if ($roomnum.val() != "") {
          roomnum = $roomnum.val()
        }
      }
    });

    $username.val('');
  });

  socket.on('get users', function(data) {
    var html = '';
    for (i = 0; i < data.length; i++) {
      html += '<span class="user">' + data[i] + '</span>';
    }

    $users.html(html);
    $usercounter.html('(' + data.length + ')');
  });
});
