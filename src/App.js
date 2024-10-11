import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Emaillist from './Emaillist';
import Compose from './Compose';
import { useDispatch, useSelector } from 'react-redux';
import { selectsendMessageIsOpen } from './features/mailSlice';
import Emaildetail from './Emaildetail';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { selectUser, signin, signout } from './features/userSlice';
import { auth } from './firebase';
import Starredemail from './Starredemail';
 // Import your Add to Drive page
import NoLayout from './NoLayout'; // Import NoLayout for no-header, no-sidebar layout
import AddToDrive from './Drive/AddToDrive';

function App({ setDarkMode }) { // Receive setDarkMode as a prop
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const dispatch = useDispatch();
  const isMessageOpen = useSelector(selectsendMessageIsOpen);     
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signin({
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        }));
      } else {
        dispatch(signout());
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle the visibility
  };

  return (
    <Router>
      {user ? (  // Check if user is logged in
        <div className="App">
          <Routes>
            {/* Routes using the full layout with Header and Sidebar */}
            <Route
              path="/"
              element={
                <>
                  <Header toggleSidebar={toggleSidebar} setDarkMode={setDarkMode} /> {/* Pass setDarkMode to Header */}
                  <div className='app_body'> 
                    <Sidebar isVisible={isSidebarVisible} />
                    <Emaillist />
                  </div>
                  {isMessageOpen && <Compose />}
                </>
              }
            />
            <Route
              path="/mail"
              element={
                <>
                  <Header toggleSidebar={toggleSidebar} setDarkMode={setDarkMode} />
                  <div className='app_body'>
                    <Sidebar isVisible={isSidebarVisible} />
                    <Emaildetail />
                  </div>
                  {isMessageOpen && <Compose />}
                </>
              }
            />
            <Route
              path="/starred"
              element={
                <>
                  <Header toggleSidebar={toggleSidebar} setDarkMode={setDarkMode} />
                  <div className='app_body'>
                    <Sidebar isVisible={isSidebarVisible} />
                    <Starredemail />
                  </div>
                  {isMessageOpen && <Compose />}
                </>
              }
            />

            {/* Route using NoLayout (without Header and Sidebar) */}
            <Route
              path="/addtodrive"
              element={
                <NoLayout>
                  <AddToDrive />
                </NoLayout>
              }
            />
          </Routes>
        </div>
      ) : (
        <Login /> // Render Login component if no user is logged in
      )}
    </Router>
  );
}

export default App;


