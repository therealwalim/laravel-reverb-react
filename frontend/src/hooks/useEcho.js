import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

window.Pusher = Pusher;

export default function useEcho() {

    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT,
            forceTLS: false,
            encrypted: false,
            enabledTransports: ['ws', 'wss'],
            authEndpoint: import.meta.env.VITE_AUTH_BROADCAST_ENDPOINT,
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
        });

        setEcho(echo);
    }, []);

    return echo;
}