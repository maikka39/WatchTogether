let messageCallback = () => {};

// setInterval(() => {
//   messageCallback({
//     avatar: 'https://maik.dev/assets/images/logo.svg',
//     alt: 'maik_dev',
//     title: 'Maik',
//     subtitle: 'Test message',
//     date: new Date(),
//     unread: 0,
//   })
// }, 1500);

setTimeout(() => {
  messageCallback({
    avatar: 'https://maik.dev/assets/images/logo.svg',
    alt: 'maik_dev',
    title: 'Maik',
    subtitle: 'Test message',
    date: new Date(),
    unread: 0,
  })
  messageCallback({
    avatar: 'https://maik.dev/assets/images/logo.svg',
    alt: 'maik_dev',
    title: 'Maik',
    subtitle: 'Test message',
    date: new Date(),
    unread: 0,
  })
}, 1000);


export function sendMessage(message) {
  console.log("sendMessage(): " + message);
}

export function setChatListener(listener) {
  messageCallback = listener;
}

export function clearChatListener() {
  messageCallback = () => {};
}