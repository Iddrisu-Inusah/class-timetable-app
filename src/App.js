import React, { useState, useEffect } from 'react';
import './App.css';
import Timetable from './components/Timetable';
import AdminPanel from './components/AdminPanel';
import SearchBar from './components/SearchBar';
import Announcements from './components/Announcements';
import { FaSun, FaMoon } from 'react-icons/fa';  // Importing icons for Dark Mode Toggle

function App() {
    const [timetable, setTimetable] = useState(() => {
        const savedData = localStorage.getItem('timetable');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [announcements, setAnnouncements] = useState(() => {
        const savedAnnouncements = localStorage.getItem('announcements');
        return savedAnnouncements ? JSON.parse(savedAnnouncements) : [];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('darkMode')) || false;
    });

    const [showAnnouncements, setShowAnnouncements] = useState(false);

    useEffect(() => {
        localStorage.setItem('timetable', JSON.stringify(timetable));
    }, [timetable]);

    useEffect(() => {
        localStorage.setItem('announcements', JSON.stringify(announcements));
    }, [announcements]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark-mode' : '';  // Apply dark mode class to body
    }, [darkMode]);

    const handleEdit = (index) => {
        const entryToEdit = timetable[index];
        setTimetable(prev => prev.filter((_, i) => i !== index));
        setTimeout(() => setTimetable(prev => [entryToEdit, ...prev]), 0);
    };

    const handleDelete = (index) => {
        const updatedTimetable = timetable.filter((_, i) => i !== index);
        setTimetable(updatedTimetable);
    };

    const filteredTimetable = timetable.filter(entry => 
        entry.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Class Timetable & Update App</h1>
            
            {/* Modern Dark Mode Toggle */}
            <div className="toggle-container">
                <div 
                    className={`toggle-switch ${darkMode ? 'active' : ''}`} 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <div className={`icon ${darkMode ? 'moon' : 'sun'}`}>
                        {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
                    </div>
                    <div className={`toggle-slider ${darkMode ? 'active' : ''}`}></div>
                </div>
                <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>

            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <AdminPanel timetable={timetable} setTimetable={setTimetable} />
            
            {/* Announcement Handle */}
            <div 
                className={`announcement-handle ${showAnnouncements ? 'active' : ''}`} 
                onClick={() => setShowAnnouncements(!showAnnouncements)}
            >
                <span className="notification-badge">{announcements.length}</span>
                {showAnnouncements ? 'Hide Announcements' : 'Show Announcements'}
            </div>

            {showAnnouncements && (
                <div className="announcement-box animated-slide-in">
                    <Announcements announcements={announcements} setAnnouncements={setAnnouncements} />
                </div>
            )}

            <Timetable timetable={filteredTimetable} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default App;