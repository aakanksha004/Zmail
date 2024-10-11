import React, { useState } from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import "../css/header.css";
import "../DriveCss/header.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import firebase from 'firebase/compat/app';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook
import logo from "./Google_Drive_Logo_32px.png";
import { Navigate, useNavigate } from 'react-router-dom';


const Header = ({ toggleSidebar }) => { 
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate=useNavigate();

    const theme = useTheme(); // Access the current theme

    // Define icon color based on the theme mode
    const iconColor = theme.palette.mode === 'dark' ? '#808080' : '#5f6368'; // Gray for dark mode, default otherwise

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

    const clickhandler=()=>{
        navigate('/');
    }

    return (
        <div className='header'>
            <div className='header_left'>
                <img src={logo} onClick={clickhandler} alt="Drive Logo" />
                <h2>Drive</h2>
            </div>

            <div className='header_middle'>
                <div className='search_mail'>
                    <IconButton>
                        <SearchIcon style={{ color: iconColor }} /> {/* Apply gray color in dark mode */}
                    </IconButton>
                    <input type="text" placeholder='Search in Drive' />
                    <IconButton>
                        <ExpandMoreIcon style={{ color: iconColor }} /> {/* Apply gray color in dark mode */}
                    </IconButton>
                </div>
            </div>

            <div className='header_right'>
                <IconButton>
                    <HelpOutlineIcon style={{ color: iconColor }} /> {/* Apply gray color in dark mode */}
                </IconButton>

                <IconButton>
                    <SettingsIcon style={{ color: iconColor }} /> {/* Apply gray color in dark mode */}
                </IconButton>

                <IconButton>
                    <AppsIcon style={{ color: iconColor }} /> {/* Apply gray color in dark mode */}
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

