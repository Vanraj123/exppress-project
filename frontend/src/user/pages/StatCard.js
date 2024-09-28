import React, { useState } from 'react';
import './Dashboard.css'; // Separate CSS file

const StatCard = ({ title, value }) => (
    <div className="stat-card">
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
);

export default StatCard;