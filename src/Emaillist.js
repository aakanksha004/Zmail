import React, { useEffect, useState } from 'react'
import "./css/emaillist.css"
import EmailListSetting from './EmailListSetting'
import Emailtype from './Emailtype'
import Emailbody from './Emailbody'
import { db } from './firebase'

const Emaillist = () => {
  const [emails, setEmails] = useState([]);
  useEffect(() => {
   db.collection("emails").orderBy("timestamp","desc").onSnapshot(snapshot=>{
    setEmails(snapshot.docs.map(doc=>({
      id:doc.id,
      data:doc.data()
    })))
   })
  }, [])
  
  return (
    <div className='emaillist'>
      <EmailListSetting/>
      <Emailtype/>

{
    emails.map(({id,data})=>{
      return  <Emailbody id={id} name={data.fromName} subject={data.subject} message={data.message} email={data.from} time={new Date(data.timestamp?.seconds*1000).toLocaleTimeString()}/>


    })
    }
     
    
    </div>
  )
}

export default Emaillist