$(function() {
  let $users = $('#users');
  let $usercounter = $('#usercounter');

  socket.on('get users', function(data) {
    var html = '';
    for (i = 0; i < data.length; i++) {
      html += '<span class="user">' + data[i] + '</span>';
    }

    $users.html(html);
    $usercounter.html('(' + data.length + ')');
  });
});
