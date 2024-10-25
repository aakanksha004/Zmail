// src/StarredEmails.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStarredEmails } from './features/starredSlice'; // Import the selector
import Emailbody from './Emailbody'; // Import Emailbody to display starred emails
import Emailtype from './Emailtype';
import EmailListSetting from './EmailListSetting';
import { db } from './firebase';

const Sentmail = () => {
    
    const [sentEmails, setSentEmails] = useState([]);
  
      
        useEffect(() => {
         db.collection("sent")
         .where("folder","==","sent").orderBy("timestamp","desc").onSnapshot(snapshot=>{
          setSentEmails(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
          })))
         })
        }, [])


  return (
    <div>
        <EmailListSetting/>
        <Emailtype/>
      
      {sentEmails.length === 0 ? (
        <p>No Sent emails</p>
      ) : (
        sentEmails.map(({id,data})=>{
            return  <Emailbody id={id} name={data.fromName} subject={data.subject} message={data.message} email={data.from} time={new Date(data.timestamp?.seconds*1000).toLocaleTimeString()}/>
      
      
          })
      )}
    </div>
  );
};

export default Sentmail;