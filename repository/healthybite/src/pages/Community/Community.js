import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar';
import Card from './components/Card';
import { getPublicPlates } from '../../firebaseService';
import { auth } from "../../firebaseConfig";

export const Community = () => {
    const [plates, setPlates] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // First useEffect to fetch data
    useEffect(() => {
        console.log("Initial useEffect running - fetching data");
        fetchPublicPlatesAndReviews();
    }, []);

    // Second useEffect to monitor plates state
    useEffect(() => {
        console.log("4. Plates state updated:", plates);
    }, [plates]);

    return (
        <div className="h-screen w-full overflow-y-hidden">
            <NavBar />
            <div className="w-full h-full flex justify-center items-start overflow-y-scroll font-quicksand mt-4 sm:mt-16 md:mt-16 lg:mt-24 pb-32">
                <div className="w-full flex flex-wrap justify-center">
                    {loading ? (
                        <p>Loading plates...</p>
                    ) : (
                        plates && plates.length > 0 ? (
                            plates.map((item, index) => (
                                <Card key={index} plate={item} review={item.review} />
                            ))
                        ) : (
                            <p>No plates available.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
