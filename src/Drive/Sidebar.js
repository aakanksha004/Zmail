import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal } from "@mui/material";
// import "../css/sidebar.css";
import "../DriveCss/sidebar.css"
import SidebarOptions from "./SidebarOptions";
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import StarRateIcon from "@mui/icons-material/StarRate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch } from "react-redux";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { db, storage } from "../firebase";
import firebase from 'firebase/compat/app';

const Sidebar = () => {
    const [open,setOpen]=useState(false);
    const [uploading,setUploading]=useState(false);
    const [file, setFile]=useState(null);
    const handleClose=()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true);
    }

   const handleChange=(e)=>{
    console.log(e)
     if(e.target.files[0]){
      setFile(e.target.files[0]);
     }

   }

   const handlesubmit=(e)=>{
    e.preventDefault();
    setUploading(true);
    storage.ref(`files/${file.name}`).put(file).then((snapshot)=>{
       storage.ref("files").child(file.name).getDownloadURL().then(url=>{
        db.collection("myfiles").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            filename:file.name,
            fileURL:url,
            size:snapshot._delegate.bytesTransferred
        })
        setUploading(false);
        setFile(null);
        setOpen(false);
       })
    })
   }


  const theme = useTheme(); 
  const [active, setActive] = useState('My Drive');
   const [showMore, setShowMore] = useState(false); // State for show more/less functionality
  const dispatch = useDispatch();
  

  const handleOptionClick = (optionTitle) => {
    setActive(optionTitle); // Set the clicked option as active
  };

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle the visibility of more options
  };

  return (
    <>
    <Modal open={open} onClose={handleClose}>
            <div className="modal_pop">
                <form >
                    <div className="modalHeading">
                        <h3>Select File You Want To Upload</h3>
                    </div>
                    <div className="modalBody">
                        {
                            uploading? (<div className="uploading"> <p >Uploading...</p></div>) : ( 
                            <> <input type="file" onChange={handleChange} className="file" />
                                <input type="submit" onClick={handlesubmit} className="post_submit"/>  </>
                                )
                        }
                      
                    </div>
                </form>
            </div>
    </Modal>
    <div className="sidebar">
         <Button onClick={handleOpen} className="compose_btn" style={{ color: theme.palette.mode === 'dark' ? 'white' : 'gray' }}  >
         <AddIcon/>
           <span >New</span>
      </Button>


      <SidebarOptions 
        Icon={CloudUploadIcon} 
        title="My Drive" 
     
        isactive={active === 'My Drive'} 
        onClick={() => handleOptionClick('My Drive')} 
      />
 

 

        <SidebarOptions
          Icon={PhonelinkIcon}
          title="Computers"
          isactive={active === 'Computers'}
          onClick={() => handleOptionClick('Computers')}
        />
    
      <SidebarOptions 
        Icon={PeopleAltIcon} 
        title="Shared with me" 
       
        isactive={active === 'Shared with me'} 
        onClick={() => handleOptionClick('Shared with me')} 
      />

      <SidebarOptions 
        Icon={ScheduleIcon} 
        title="Recent" 
 
        isactive={active === 'Recent'} 
        onClick={() => handleOptionClick('Recent')} 
      />

      {/* Only show these options when 'showMore' is true */}
      <div className={`show-more-options ${showMore ? 'active' : ''}`}>
      {showMore && (
        <>
          <SidebarOptions 
            Icon={StarRateIcon} 
            title="Starred" 
            
            isactive={active === 'Starred'} 
            onClick={() => handleOptionClick('Starred')} 
          />

          <SidebarOptions 
            Icon={DeleteOutlineIcon} 
            title="Trash" 
           
            isactive={active === 'Trash'} 
            onClick={() => handleOptionClick('Trash')} 
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
      
      {/* <hr /> */}
      
      <div className="storage">
         <SidebarOptions 
            Icon={CloudQueueIcon} 
            title="Storage" 
            isactive={active === 'Storage'} 
            onClick={() => handleOptionClick('Storage')} 
          />
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100"/>
            <span>6.45 GB of 15 GB used</span>
          </div>
      
      </div>
     

      
    </div>
    </>
  );
};

export default Sidebar; 