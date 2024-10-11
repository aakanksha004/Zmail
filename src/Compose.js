import React, { useState } from 'react'
import "./css/compose.css"
import RemoveIcon from "@mui/icons-material/Remove"
import HeightIcon from "@mui/icons-material/Height"
import CloseIcon from "@mui/icons-material/Close"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import FormatColorTextIcon from "@mui/icons-material/FormatColorText"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import LinkIcon from "@mui/icons-material/Link"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import PhotoIcon from "@mui/icons-material/Photo"
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock"
import CreateIcon from "@mui/icons-material/Create"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import DeleteIcon from "@mui/icons-material/Delete"
 import { useDispatch, useSelector } from 'react-redux'
import { closeSendMessage } from './features/mailSlice'
import { db } from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { selectUser } from './features/userSlice'

function Compose() {
  
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

   const dispatch=useDispatch();
   const user=useSelector(selectUser);


  const formSubmit=(e)=>{
    e.preventDefault();
    if(to===""){
      return alert("Recipient is required")
    }

    if(subject===""){
      return alert("Subject is required")
    }
    if(message===""){
      return alert("Message is required")
    }
    db.collection("emails").add({
      to:to,
      subject:subject,
      message:message,
      from: user.email,
      fromName:user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setTo("");
    setSubject("");
    setMessage("");
    alert("email sent succesfully");
    dispatch(closeSendMessage());
    

  }
  return (
    <div className='compose'>
        <div className='compose_header'>
            <div className='compose_headerLeft'>
               <span>New Message</span>
            </div>
            <div className='compose_headerRight'>
                <RemoveIcon />
                <HeightIcon/>
                <CloseIcon onClick={()=>dispatch(closeSendMessage())} />
            </div>
        </div>
         <form onSubmit={formSubmit}>
        <div className='compose_body'>
            <div className='compose_bodyForm'>
            <input type="email" placeholder='Recipients' value={to} onChange={(e)=>setTo(e.target.value)} />
            <input type="text" placeholder='Subject' value={subject} onChange={(e)=>setSubject(e.target.value)} />
            <textarea rows="20" onChange={(e)=>setMessage(e.target.value)} >{message}</textarea>

            </div>
           
        </div>

        <div className='compose_footer'>
        <div className='compose_footerLeft'>
             <button  type='submit'>
                Send <ArrowDropDownIcon/>
             </button>
           </div>

           <div className='compose_footerRight'>
               <FormatColorTextIcon/>
               <AttachFileIcon/>
               <LinkIcon/>
               <InsertEmoticonIcon/>
               <NoteAddIcon/>
               <PhotoIcon/>
               <PhonelinkLockIcon/>
               <CreateIcon/>
               <MoreVertIcon/>
               <DeleteIcon/>
              </div>
        </div>
        </form>
    </div>
  )
}

export default Compose