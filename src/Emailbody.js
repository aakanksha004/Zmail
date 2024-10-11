import React from 'react';
import "./css/emaillist.css";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openMessage } from './features/mailSlice';
import { addStarredEmail, removeStarredEmail, selectStarredEmails } from './features/starredSlice'; // Import actions and selector

const Emailbody = ({ name, subject, message, email, time }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const starredEmails = useSelector(selectStarredEmails); // Get starred emails from the store

  // Check if the email is already starred
  const isStarred = starredEmails.some(starredEmail => starredEmail.email === email);

  const setMail = () => {
    dispatch(openMessage({ name, subject, message, email, time }));
    navigate('/mail');
  };

  const handleClick = () => {
    if (isStarred) {
      dispatch(removeStarredEmail({ email })); // Remove from starred
    } else {
      dispatch(addStarredEmail({ name, subject, message, email, time })); // Add to starred
    }
  };

  return (
    <div className='emailbody'>
      <div className='emailbody_left'>
        <IconButton>
          <CheckBoxOutlineBlankIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <StarBorderIcon style={{ color: isStarred ? 'yellow' : 'gray' }} />
        </IconButton>
        <IconButton>
          <LabelOutlinedIcon />
        </IconButton>
        <h4>{name}</h4>
      </div>

      <div className='emailbody_middle' onClick={setMail}>
        <div className='emailbody_middle_msg'>
          <p><b>{subject}</b> <span>{message}</span></p>
        </div>
      </div>

      <div className='emailbody_right'>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Emailbody;
