import { useState, useEffect } from 'react';
import api from '../utils/api';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await api.get('/events');
                if (response.data.success) {
                    setEvents(response.data.data);
                } else {
                    setError('Failed to fetch events');
                }
            } catch (err) {
                setError(err.message || 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return { events, loading, error };
};

export default useEvents;
