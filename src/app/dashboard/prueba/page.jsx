'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function UserProfile() {
    const [userId, setUserId] = useState('');
    const [fullname, setFullname] = useState('');
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    console.log(session, status)
    const autenticado = () => {
      if (status === "authenticated" && session) {
        const { user } = session;
        return user;
      }
    }

    const fetchFullname = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/tasks/${autenticado()._id}`);
            console.log(response.data.data)
            setFullname(response.data.data.fullname);
        } catch (error) {
            console.error('Error retrieving user fullname:', error);
            setFullname('');
        }
        setLoading(false);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={fetchFullname}>Search</button>

            {loading && <p>Loading...</p>}
            {fullname && <p>User Fullname: {fullname}</p>}
        </div>
    );
}

export default UserProfile;
