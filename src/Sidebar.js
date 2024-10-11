import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import "./css/sidebar.css";
import SidebarOptions from "./SidebarOptions";
import InboxIcon from "@mui/icons-material/Inbox";
import StarRateIcon from "@mui/icons-material/StarRate";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { useDispatch } from "react-redux";
import { openSendMessage } from "./features/mailSlice";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const theme = useTheme(); 
  const [activeOption, setActiveOption] = useState('Inbox'); // Track active option
  const [showMore, setShowMore] = useState(false); // State for show more/less functionality
  const dispatch = useDispatch();
  

  const handleOptionClick = (optionTitle) => {
    setActiveOption(optionTitle); // Set the clicked option as active
  };

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle the visibility of more options
  };

  return (
    <div className="sidebar">
      <Button onClick={() => dispatch(openSendMessage())} startIcon={<AddIcon />} className="compose_btn" style={{ color: theme.palette.mode === 'dark' ? 'white' : 'gray' }}  >
        Compose
      </Button>

<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
      <SidebarOptions 
        Icon={InboxIcon} 
        title="Inbox" 
        number="224" 
        isactive={activeOption === 'Inbox'} 
        onClick={() => handleOptionClick('Inbox')} 
      />
      </Link>

 
<Link to="/starred" style={{ textDecoration: 'none' ,color: 'black' }}>
        <SidebarOptions
          Icon={StarRateIcon}
          title="Starred"
          isactive={activeOption === 'Starred'}
          onClick={() => handleOptionClick('Starred')}
        />
      </Link>
      <SidebarOptions 
        Icon={WatchLaterIcon} 
        title="Snoozed" 
        number="224" 
        isactive={activeOption === 'Snoozed'} 
        onClick={() => handleOptionClick('Snoozed')} 
      />

      <SidebarOptions 
        Icon={LabelImportantIcon} 
        title="Important" 
        number="224" 
        isactive={activeOption === 'Important'} 
        onClick={() => handleOptionClick('Important')} 
      />

      {/* Only show these options when 'showMore' is true */}
      <div className={`show-more-options ${showMore ? 'active' : ''}`}>
      {showMore && (
        <>
          <SidebarOptions 
            Icon={SendIcon} 
            title="Sent" 
            number="224" 
            isactive={activeOption === 'Sent'} 
            onClick={() => handleOptionClick('Sent')} 
          />

          <SidebarOptions 
            Icon={DraftsIcon} 
            title="Drafts" 
            number="224" 
            isactive={activeOption === 'Drafts'} 
            onClick={() => handleOptionClick('Drafts')} 
          />

          <SidebarOptions 
            Icon={LabelIcon} 
            title="Category" 
            number="224" 
            isactive={activeOption === 'Category'} 
            onClick={() => handleOptionClick('Category')} 
          />

          <SidebarOptions 
            Icon={DeleteIcon} 
            title="[Map]/Trash" 
            number="224" 
            isactive={activeOption === '[Map]/Trash'} 
            onClick={() => handleOptionClick('[Map]/Trash')} 
          />

          <SidebarOptions 
            Icon={FindInPageIcon} 
            title="Documents" 
            number="224" 
            isactive={activeOption === 'Documents'} 
            onClick={() => handleOptionClick('Documents')} 
          />
        </>
      )}

</div>
      <SidebarOptions 
        Icon={ExpandMoreIcon} 
        title={showMore ? "Show Less" : "More"} 
        number="" 
        onClick={toggleShowMore} 
      />
      
      <hr />
      <h3 className="sidebaroptions_heading">Other</h3>

      <SidebarOptions 
        Icon={VideocamIcon} 
        title="New Meeting" 
        number="" 
        isactive={activeOption === 'New Meeting'} 
        onClick={() => handleOptionClick('New Meeting')} 
      />
<Link to="/addtodrive" style={{ textDecoration: 'none' ,color: 'black' }}>
      <SidebarOptions 
        Icon={AddToDriveIcon} 
        title="Add to drive" 
        number="" 
        isactive={activeOption === 'Add to drive'} 
        onClick={() => handleOptionClick('Add to drive')} 
      />
      </Link>
    </div>
  );
};

export default Sidebar; 