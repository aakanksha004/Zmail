import React from 'react';
import { useTheme } from '@mui/material/styles';
import './css/sidebarOptions.css';

const SidebarOptions = ({ Icon, title, number, isactive, onClick }) => {
    const theme = useTheme(); // Access the current theme

    // Define colors based on the theme mode
    const textColor = theme.palette.mode === 'dark' ? 'white' : '#808080'; // Text color
    const iconColor = isactive ? '#d93025' : textColor; // Icon color

    return (
        <div
            className={`sidebarOptions ${isactive ? 'sidebarOptions--active' : ''} ${theme.palette.mode === 'dark' ? 'dark' : ''}`} // Add active class and dark mode class if applicable
            onClick={onClick}
            style={{
                color: textColor, // Set text color based on the theme
            }}
        >
            <Icon
                style={{
                    color: iconColor, // Change icon color based on active state and theme
                }}
            />
            <h4 style={{ color: iconColor, fontWeight: isactive ? 'bold' : 'normal' }}>
                {title}
            </h4>
            <p style={{ color: isactive ? '#d93025' : theme.palette.text.secondary }}>
                {number}
            </p>
        </div>
    );
};

export default SidebarOptions;







