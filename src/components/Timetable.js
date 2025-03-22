import React from 'react';
import './Timetable.css';

function Timetable({ timetable, onEdit, onDelete }) {
    return (
        <div>
            <h2>Class Timetable</h2>
            <table className="fade-in">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Course</th>
                        <th>Venue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((item, index) => (
                        <tr key={index}>
                            <td>{item.day}</td>
                            <td>{item.time}</td>
                            <td>{item.course}</td>
                            <td>{item.venue}</td>
                            <td>
                                <button onClick={() => onEdit(index)}>Edit</button>
                                <button onClick={() => onDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Timetable;