import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import { Text, Image } from '@mantine/core';

const BusinessPanelLeftNavbar = ({BusinessSideBarData}) => {

  const [opened, setOpened] = useState(null);

  const handleToggleVisibility1 = (val) => {
    val === opened ? setOpened(null) : setOpened(val);

  };
  

  const sidebarStyles = {
    width: '300px',
    backgroundColor: "#5F3DC4",
    padding: '1px',
  };

  const navLinkStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    borderRadius: '4px',
    justifyContent: 'space-between',

  };

  const SubnavLinkStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    borderRadius: '4px',
  };

  const pointerStyles = {
    marginLeft: '10px',
  };

  const iconStyles = {
    marginRight: '5%',
  };

  const ulStyles = {
    listStyleType: 'none', // Remove bullets
    marginLeft: '-30px',
  };


  return (
    <div style={sidebarStyles} >
      <nav>
        <ul style={ulStyles}>
          {BusinessSideBarData.map((obj, ind) => {
            return <li>
              <NavLink
                exact
                to={obj.link}
                style={navLinkStyles}
                activeStyle={{ fontWeight: 'bold' }}
                onClick={() => handleToggleVisibility1(obj.name)}
              >
              <span style={{width:'100%'}}>
                {obj.Icon && <obj.Icon style={iconStyles} />}
                {ind + 1 + "- " + obj.name}
                </span>
                {obj.subLink && (
                  <span style={pointerStyles}>
                  {opened === obj.name ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </span>
                )}
               
              </NavLink>
              {obj.subLink && opened === obj.name && <ul style={ulStyles}>
                {obj.subLink.map((subObj, ind) => {
                  return <li>
                    <NavLink
                      exact
                      to={subObj.link}
                      style={SubnavLinkStyles}
                      activeStyle={{ fontWeight: 'bold' }}
                    >
                      {subObj.Icon && <subObj.Icon style={iconStyles} />}
                      {ind + 1 + "- " + subObj.name}
                    </NavLink>
                  </li>
                })}
              </ul>}
            </li>
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BusinessPanelLeftNavbar;