import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import "./ProfileButton.css";
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { BsLightbulbFill } from "react-icons/bs";

// import { toggleTheme } from '../../themeUtils';
import { useTheme } from '../../context/ThemeContext';

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };


  useEffect(() => {
    if (!showMenu) return;


    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };


    document.addEventListener("click", closeMenu);


    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const closeMenu = () => setShowMenu(false);


  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };


  const handlePortfolioClick = e => {
    e. preventDefault()
    navigate("/portfolio")
    closeMenu()
  }

  const handleModeChange = () => {
    toggleTheme();
  };

  return (
    <>
      <button className='profile-button' onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li className='profile-username'>{user.username}</li>
              <li className='profile-list-item-with-icon'>
                <FaBriefcase />
                <button className='profile-my-portfolio' onClick={handlePortfolioClick}>My Portfolio</button>
              </li>
              <li className='profile-list-item-with-icon'>
                <BsLightbulbFill />
                <button className='profile-mode-button' id="change-mode-button" onClick={handleModeChange}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
              </li>
              <li className='profile-list-item-with-icon'>
                <MdOutlineLogout />
                <button className='profile-log-out' onClick={logout}>Log Out</button>
              </li>
              
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                // modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}


export default ProfileButton;

