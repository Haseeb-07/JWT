import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodJoke = () => {
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJoke = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.spoonacular.com/food/jokes/random', {
                    params: {
                        apiKey: 'cbea8e4c2def4e189b19bbb99e85a40b'
                    }
                });
                setJoke(response.data.text);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch joke. Please try again later.');
                setLoading(false);
            }
        };

        fetchJoke();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-center">Random Food Joke</h2>
            <p className="text-gray-700 text-center">{joke}</p>
        </div>
    );
};

export default FoodJoke;
