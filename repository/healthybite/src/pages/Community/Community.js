import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/NavBar';
import Card from './components/Card';
import { getPublicPlates, fetchUser, getUserNotification, markNotificationAsRead } from '../../firebaseService';
import Loading from "../../components/Loading";

export const Community = () => {
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(true); // Popup visibility

    const fetchPublicPlatesAndNotifications = async () => {
        try {
            const fetchedPlates = await getPublicPlates();
            setPlates(fetchedPlates || []);
            
            const fetchedNotifications = await getUserNotification();
            setNotifications(fetchedNotifications || []);
        } catch (err) {
            console.error("Error fetching plates or notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicPlatesAndNotifications();
    }, []);

    const handleDismissNotification = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId); // Update in Firebase
            setNotifications(notifications.filter(notif => notif.id !== notificationId));
            setShowNotification(false);
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const filteredPlates = plates.filter(plate =>
        plate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen w-full overflow-y-hidden">
            <NavBar />
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full h-full flex flex-col items-center overflow-y-scroll font-quicksand mt-4 sm:mt-16 md:mt-16 lg:mt-24 pb-32">
                    <div className="w-2/3 justify-center">
                        <input
                            type="text"
                            placeholder="Search plates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border border-gray-300 font-quicksand rounded mb-4"
                        />
                    </div>
                    {/* Notification Popup */}
                    {showNotification && notifications.length > 0 && (
                        <div className="fixed top-4 right-4 w-1/3 bg-hbGreen p-4 rounded shadow-lg z-50">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold font-quicksand">Notifications</h2>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="cursor-pointer, text-healthyGreen"
                                    onClick={() => handleDismissNotification(notifications[0].id)}
                                />
                            </div>
                            <p className="text-sm font-quicksand mt-2">{notifications[0].message}</p>
                        </div>
                    )}
                    
                    <div className="w-full flex flex-wrap justify-center">
                        {filteredPlates.length > 0 ? (
                            filteredPlates.map((item, index) => (
                                <Card key={index} plate={item} review={item.review} />
                            ))
                        ) : (
                            <p>No plates available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
