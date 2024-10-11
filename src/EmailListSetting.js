import React from 'react'
import "./css/emaillist.css"
import { IconButton } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation, useNavigate } from 'react-router-dom';


const EmailListSetting = () => {
    const navigate= useNavigate();




    let location=useLocation();
    const path = location.pathname.split('/')[1];
  return (
    <div className='emaillist_settings'>
         <div className='emaillist_settingsLeft'>
         {path === 'mail' ? (
            <IconButton>
                <ArrowBackIcon onClick={()=>navigate('/')}/>
            </IconButton>  
       
      ) : (
        <IconButton>
             <CheckBoxOutlineBlankIcon/>
        </IconButton>
      )}
           
            <IconButton>
                <ArrowDropDownIcon/>
            </IconButton>
            <IconButton>
                <RefreshIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
           
         </div>
       

         <div className='emaillist_settingsRight'>
            <p>1-50 of 10,222</p>

            <IconButton>
                <ChevronLeftIcon/>
            </IconButton>
            <IconButton>
                <ChevronRightIcon/>
            </IconButton>
            </div>

    </div>
  )
}

export default EmailListSetting