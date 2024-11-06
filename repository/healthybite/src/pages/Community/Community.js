import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar';
import Card from './components/Card';
import { getPublicPlates,fetchUser } from '../../firebaseService';
import { auth } from "../../firebaseConfig";
import Loading from "../../components/Loading";

export const Community = () => {
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");  // State for search query

    const fetchPublicPlatesAndReviews = async () => {
        console.log("1. Starting to fetch plates...");
        const user = auth.currentUser;
        if (user) {
            try {
                const fetchedPlates = await getPublicPlates();
                console.log("2. Fetched plates data:", fetchedPlates);
                
                if (Array.isArray(fetchedPlates)) {
                    console.log("3. Setting plates state with:", fetchedPlates);
                    setPlates(fetchedPlates);
                } else {
                    console.warn("Fetched data is not an array:", fetchedPlates);
                }
            } catch (err) {
                console.error("Error fetching plates:", err);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("No user is signed in");
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Initial useEffect running - fetching data");
        fetchPublicPlatesAndReviews();
    }, []);

    const filteredPlates = plates.filter(plate =>
        plate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen w-full overflow-y-hidden">
            <NavBar />
            {loading ? (
                <Loading/>
            ) : (
                <div className="w-full h-full flex flex-col items-center overflow-y-scroll font-quicksand mt-4 sm:mt-16 md:mt-16 lg:mt-24 pb-32">
                    <div className="w-2/3  justify-center">
                    <input
                        type="text"
                        placeholder="Search plates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        class="w-full p-2 border border-gray-300 font-quicksand rounded mb-4"                    />
                    </div>
                    
                    <div className="w-full flex flex-wrap justify-center">
                        {filteredPlates && filteredPlates.length > 0 ? (
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
