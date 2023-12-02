import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import { Text, Image } from '@mantine/core';


const SuperAdminNavbar = ({SuperAdminSideBarData}) => {

  const [opened, setOpened] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [subHoveredLink, setSubHoveredLink] = useState(null);

  const handleToggleVisibility1 = (val) => {
    val === opened ? setOpened(null) : setOpened(val);
  };
  

  const sidebarStyles = {
    width: '300px',
    //backgroundColor: "#5F3DC4",
    padding: '1px',
  };

  const navLinkStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '15px',
    borderRadius: '4px',
    justifyContent: 'space-between',
    //backgroundColor: "#5F3DC4",

  };

  const SubnavLinkStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '15px',
    borderRadius: '4px',
     //backgroundColor: "#5F3DC4",
  };

  const pointerStyles = {
    marginLeft: '10px',
  };

  const iconStyles = {
    marginRight: '5%',
  };

  const ulStyles = {
    listStyleType: 'none', // Remove bullets
    marginLeft: '-40px',
  };

  const SubUlStyles = {
    listStyleType: 'none', // Remove bullets
    marginLeft: '-20px',
  };



  return (
    <div style={sidebarStyles}>
      <nav>
        <ul style={ulStyles}>
          {SuperAdminSideBarData.map((obj, ind) => {
            return (
              <li key={ind}>
                <NavLink
                  exact
                  to={obj.link}
                  onMouseEnter={() => setHoveredLink(obj.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    ...navLinkStyles,
                    backgroundColor: hoveredLink === obj.name ? '#F76707' : 'initial', // Change background color on hover
                  }}
                  activeStyle={{ fontWeight: 'bold' }}
                  onClick={() => handleToggleVisibility1(obj.name)}
                >
                  <span style={{ width: '100%' }}>
                    {obj.Icon && <obj.Icon style={iconStyles} />}
                    {`${ind + 1}. ${obj.name}`}
                  </span>
                  {obj.subLink && (
                    <span style={pointerStyles}>
                      {opened === obj.name ? <AiFillCaretUp /> : <AiFillCaretDown />}
                    </span>
                  )}
                </NavLink>
                {obj.subLink && opened === obj.name && (
                  <ul style={SubUlStyles}>
                    {obj.subLink.map((subObj, subInd) => {
                      return (
                        <li key={subInd}>
                          <NavLink
                            exact
                            to={subObj.link}
                            onMouseEnter={() => setSubHoveredLink(subObj.name)}
                            onMouseLeave={() => setSubHoveredLink(null)}
                            //style={SubnavLinkStyles}
                            style={{
                              ...SubnavLinkStyles,
                              backgroundColor: subHoveredLink === subObj.name ? '#F59F00' : 'initial', // Change background color on hover
                            }}
                            activeStyle={{ fontWeight: 'bold' }}
                          >
                            {subObj.Icon && <subObj.Icon style={iconStyles} />}
                            {`${ind + 1}.${subInd + 1} ${subObj.name}`}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SuperAdminNavbar;