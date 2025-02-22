import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/NavBar';
import NotificationPopup from '../../components/NotificationPopup'; // Corrected path
import Card from './components/Card';
import { getPublicPlates, getUserNotification, markNotificationAsRead } from '../../firebaseService';
import Loading from "../../components/Loading";
import { UserContext } from "../../App";

export const Community = () => {
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const {user_id}=useContext(UserContext)

    const fetchPublicPlatesAndNotifications = async () => {
        try {
            const fetchedPlates = await getPublicPlates();
            setPlates(fetchedPlates || []);
        } catch (err) {
            console.error("Error fetching plates or notifications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(`ID USER ${user_id}`)
        user_id && fetchPublicPlatesAndNotifications();
    }, [user_id]);


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
                    <div className="w-full justify-center flex sticky top-0 z-10 bg-white ">
                        <input
                            type="text"
                            placeholder="Search plates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-2/3 p-2 border border-gray-300 font-quicksand rounded mb-4"
                        />
                    </div>
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

