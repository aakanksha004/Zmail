import React from 'react'
import "./css/emaillist.css"
import EmailListSetting from './EmailListSetting'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import { IconButton, Avatar } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import PrintIcon from '@mui/icons-material/Print'
import StarIcon from '@mui/icons-material/Star'
import ReplyIcon from '@mui/icons-material/Reply'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useSelector } from 'react-redux'
import { selectedMessage } from './features/mailSlice'
import { selectUser } from './features/userSlice'
// import { useNavigate } from 'react-router-dom';
function Emaildetail() {
    
    const selectedMail= useSelector(selectedMessage);
    
  return (


    <div className='emaildetails'>
         <EmailListSetting/>
         
         <div className='emaildetails_message'>
         <div className='emaildetails_header'>
            <div className='emaildetails_headerLeft'>
                <h4>{selectedMail.subject}</h4> 
                <IconButton>
                    <LabelImportantIcon/>
                </IconButton>
            </div>

            <div className='emaildetails_headerRight'>
            <IconButton>
                    <PrintIcon/>
                </IconButton>

                <IconButton>
                    <LaunchIcon/>
                </IconButton>
                </div>
         </div>

         <div className='emaildetails_middleheader'>
            <div className='emaildetails_middleheaderLeft'>
              
                <IconButton>
                    <Avatar /> 
                </IconButton>
                <h4>{selectedMail.name}</h4>
                <p>{selectedMail.email}</p>
            </div>

            <div className='emaildetails_middleheaderRight'>
            
            <p>{selectedMail.time}</p>
            <IconButton>
                    <StarIcon/>
                </IconButton>

                <IconButton>
                    <ReplyIcon/>
                </IconButton>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                </div>

               
         </div>
         <div className='emaildetails_body'>
                    <p>{selectedMail.message}</p>
         </div>
    </div>
    </div>
  )
}

export default Emaildetail