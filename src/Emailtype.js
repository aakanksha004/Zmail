import { IconButton } from '@mui/material';
import React, { useState } from 'react'; // Import useState
import "./css/emaillist.css";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function Emailtype() {
  const [activeOption, setActiveOption] = useState('primary'); // State to track active option

  const handleOptionClick = (option) => {
    setActiveOption(option); // Update active option on click
  };

  return (
    <div className='emailtype'>
      <div 
        className={`emailtype_options ${activeOption === 'primary' ? 'emailtype_options--active' : ''}`} 
        onClick={() => handleOptionClick('primary')} // Handle click for Primary
      >
        <InboxIcon />
        <p>Primary</p>
      </div>

      <div 
        className={`emailtype_options ${activeOption === 'social' ? 'emailtype_options--active' : ''}`} 
        onClick={() => handleOptionClick('social')} // Handle click for Social
      >
        <PeopleIcon />
        <p>Social</p>
      </div>

      <div 
        className={`emailtype_options ${activeOption === 'promotions' ? 'emailtype_options--active' : ''}`} 
        onClick={() => handleOptionClick('promotions')} // Handle click for Promotions
      >
        <LocalOfferIcon />
        <p>Promotions</p>
      </div>
    </div>
  );
}

export default Emailtype;
