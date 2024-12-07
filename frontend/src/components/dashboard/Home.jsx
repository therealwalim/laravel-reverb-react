import axios from "src/lib/axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/context/AuthContext";
import useEcho from "src/hooks/useEcho";

const Home = () => {

    const { user, logout } = useAuthContext();

    const [notifications, setNotifications] = useState(null);

    const echo = useEcho();

    const handleNotification = (e) => {
        console.log(e.notification);
        setNotifications((prevNotifications) => [...prevNotifications, {...e.notification, new: true}]);
    };

    useEffect(() => {
        const getNotifications = async () => {
            const { data } = await axios.get('/api/notifications');
            setNotifications(data?.notifications);
        };

        getNotifications();

        if (echo) {
            echo.private(`notification.1`).listen('FireNotification', handleNotification);
        }
    }, [echo]);

    return (
        <div className="w-full h-screen">
            {/* Navbar */}
            <div className="bg-blue-500 text-white p-4 flex justify-between px-4">
                <h1 className="text-3xl">Dashboard</h1>
                <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
            {/* Content */}
            <div className="p-4">
                <h2 className="text-2xl">Welcome, {user?.name}!</h2>
                <p>You have successfully logged in.</p>
            </div>
            <div className="p-4">
                <h2 className="text-2xl">Notifications {notifications?.length ?? 0}</h2>
                <ul className="mt-4">
                    {notifications?.length > 0 && notifications?.map((notification) => (
                        <li key={notification?.id} className={notification?.new ? 'bg-blue-200' : ''}>
                            <span className="text-blue-500">{notification?.title}: </span>{notification?.body}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;