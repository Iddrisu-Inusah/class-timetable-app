import React, { useState } from 'react';
import './Announcements.css';

function Announcements({ announcements, setAnnouncements }) {
    const [announcementText, setAnnouncementText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [replyText, setReplyText] = useState('');

    const handleAddOrEdit = () => {
        if (!announcementText.trim()) {
            setErrorMessage("Announcement cannot be empty.");
            return;
        }

        if (editIndex !== null) { 
            const updatedAnnouncements = [...announcements];
            updatedAnnouncements[editIndex].text = announcementText;
            updatedAnnouncements[editIndex].timestamp = new Date().toLocaleString();
            setAnnouncements(updatedAnnouncements);
            setEditIndex(null);
        } else {
            const newAnnouncement = {
                text: announcementText,
                timestamp: new Date().toLocaleString(),
                replies: []
            };
            setAnnouncements(prev => [newAnnouncement, ...prev]);
        }

        setAnnouncementText('');
        setErrorMessage('');
    };

    const handleEdit = (index) => {
        setAnnouncementText(announcements[index].text);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedAnnouncements = announcements.filter((_, i) => i !== index);
        setAnnouncements(updatedAnnouncements);
    };

    const handleReply = (index) => {
        if (!replyText.trim()) return;
        
        const updatedAnnouncements = [...announcements];
        updatedAnnouncements[index].replies.push({
            text: replyText,
            timestamp: new Date().toLocaleString()
        });

        setAnnouncements(updatedAnnouncements);
        setReplyText('');
    };

    return (
        <div>
            <textarea 
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Type your announcement here..."
                rows="3"
                style={{ width: '80%' }}
            />
            <br />
            <button onClick={handleAddOrEdit}>
                {editIndex !== null ? 'Update Announcement' : 'Post Announcement'}
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <div>
                <h3>Past Announcements:</h3>
                {announcements.map((announce, index) => (
                    <div key={index} className="announcement">
                        <p>{announce.text}</p>
                        <small>Posted on: {announce.timestamp}</small><br/>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        
                        {/* Replies Section */}
                        <div className="replies">
                            <h4>Replies:</h4>
                            {announce.replies.map((reply, i) => (
                                <div key={i} className="reply">
                                    <p>{reply.text}</p>
                                    <small>Posted on: {reply.timestamp}</small>
                                </div>
                            ))}
                        </div>

                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            rows="2"
                            style={{ width: '80%', marginTop: '5px' }}
                        />
                        <br />
                        <button onClick={() => handleReply(index)}>Reply</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Announcements;