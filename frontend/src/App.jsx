import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: 'padxk53rgd3dm2dsqo3t',
  wsHost: 'localhost',
  wsPort: 8080,
  forceTLS: false,
  encrypted: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: "http://laravel-reverb-react.local/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer 3|jtnBktRvyhaWNa41kuF2iZJwVaxqNleh87sNim4a9905ee7d`
    }
  }
});

function App() {

  window.Echo.private(`notification.1`).listen('FireNotification', (e) => {
    console.log(e, 'test purpose');
  });

  return (
    <h1>Hello World</h1>
  )
}

export default App
