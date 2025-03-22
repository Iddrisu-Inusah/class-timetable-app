import React, { useState } from 'react';
import './AdminPanel.css';  // Make sure to create this file

function AdminPanel({ timetable, setTimetable }) {
    const [course, setCourse] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!course || !day || !time || !venue) {
            setErrorMessage('All fields are required.');
            return;
        }

        const newEntry = { course, day, time, venue };
        setTimetable(prev => [...prev, newEntry]);

        setCourse('');
        setDay('');
        setTime('');
        setVenue('');
        setErrorMessage('');
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <input 
                    type="text" 
                    placeholder="Course" 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Day" 
                    value={day} 
                    onChange={(e) => setDay(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Time (e.g., 10:00 AM - 12:00 PM)" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Venue" 
                    value={venue} 
                    onChange={(e) => setVenue(e.target.value)}
                />
                <button type="submit">Add to Timetable</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default AdminPanel;