// src/StarredEmails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectStarredEmails } from './features/starredSlice'; // Import the selector
import Emailbody from './Emailbody'; // Import Emailbody to display starred emails
import Emailtype from './Emailtype';
import EmailListSetting from './EmailListSetting';

const Starredemail = () => {
  const starredEmails = useSelector(selectStarredEmails); // Get starred emails from the Redux store

  return (
    <div>
        <EmailListSetting/>
        <Emailtype/>
      
      {starredEmails.length === 0 ? (
        <p>No starred emails</p>
      ) : (
        starredEmails.map((email, index) => (
          <Emailbody key={index} {...email} /> // Render each starred email
        ))
      )}
    </div>
  );
};

export default Starredemail;
