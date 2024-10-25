import React, { useState } from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import "./css/header.css";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Header = ({ toggleSidebar, setDarkMode }) => { 
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null); 
    const theme = useTheme(); // Get the theme

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = () => {
        setAnchorEl(null); 
    };

    const handleLogout = () => {
        firebase.auth().signOut(); 
        handleClose(); 
    };

    const handleToggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode); 
    };

    // Determine icon color based on the theme
    const iconColor = theme.palette.mode === 'dark' ? 'gray' : 'inherit';

    return (
        <div className='header'>
            <div className='header_left'>
                <IconButton onClick={toggleSidebar}>
                    <ReorderIcon />
                </IconButton>
                <img src="https://st2.depositphotos.com/3867453/9096/v/450/depositphotos_90960528-stock-illustration-letter-z-logo-icon-design.jpg" alt="" />
                <p>Mail</p>
            </div>

            <div className='header_middle'>
                <div className='search_mail'>
                    <IconButton>
                        <SearchIcon style={{ color: iconColor }} /> {/* Apply icon color */}
                    </IconButton>
                    <input type="text" placeholder='Search mail' />
                    <IconButton>
                        <ExpandMoreIcon style={{ color: iconColor }} /> {/* Apply icon color */}
                    </IconButton>
                </div>
            </div>

            <div className='header_right'>
                <IconButton onClick={handleToggleDarkMode}>
                    <ContrastIcon />
                </IconButton>

                <IconButton>
                    <SettingsIcon />
                </IconButton>

                <IconButton>
                    <AppsIcon />
                </IconButton>

                <Avatar 
                    src={user?.photoUrl} 
                    onClick={handleAvatarClick} 
                />
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default Header;
