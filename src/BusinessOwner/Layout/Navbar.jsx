import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineShop, AiOutlineSetting, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BiUser, BiChat, BiHelpCircle } from 'react-icons/bi';
import { RiTeamLine } from 'react-icons/ri';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import { Text, Image } from '@mantine/core';

const BusinessPanelLeftNavbar = ({sideBarData}) => {

  const [isVisible1, setIsVisible1] = useState(false);
  const [opened, setOpened] = useState(null)
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleVisibility1 = (val) => {
    val === opened ? setOpened(null) : setOpened(val);

  };
  const handleToggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };
  const handleToggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };

  const handleToggleVisibility4 = () => {
    setIsVisible4(!isVisible4);
  };

  const handleToggleVisibility5 = () => {
    setIsVisible5(!isVisible5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const sidebarStyles = {
    width: '300px',
    //backgroundColor: '#770737',
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



  };

  const navLinkStyles1 = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '25px',

  };

  const pointerStyles = {
    //marginLeft: '10px',
  };

  const iconStyles = {
    marginRight: '5%'

  };

  const headingStyles = {
    flex: '2',
    //backgroundColor: 'green'
  };

  const ulStyles = {
    listStyleType: 'none', // Remove bullets
    marginRight: '10px',
    marginLeft: '-20px',
    //backgroundColor: 'white',


  };


  return (
    <div style={sidebarStyles} >
      <nav>
        <ul style={ulStyles}>
          {sideBarData.map((obj, ind) => {
            return <li>
              <NavLink
                exact
                to={obj.link}
                style={navLinkStyles}
                activeStyle={{ fontWeight: 'bold' }}
                onClick={() => handleToggleVisibility1(obj.name)}
              >
                {/* <Icon /> */}
                <Image maw={20} radius="md" src={obj.Icon} />
                {ind + 1 + "- " + obj.name}

                {obj.subLink && <AiFillCaretDown style={pointerStyles} />}
              </NavLink>
              {obj.subLink && opened === obj.name && <ul style={ulStyles}>
                {obj.subLink.map((subObj, ind) => {
                  return <li>
                    <NavLink
                      exact
                      to={subObj.link}
                      style={navLinkStyles}
                      activeStyle={{ fontWeight: 'bold' }}
                    >
                      {subObj.icon}
                      {subObj.name}
                    </NavLink>
                  </li>
                })}
              </ul>}
            </li>
          })}
        </ul>
        {/* <ul style={ulStyles}>
          <li>
            <NavLink
              exact
              to="/Dashboard"
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
            >
              <AiOutlineDashboard style={iconStyles} />
              1- Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
              onClick={handleToggleVisibility3}
            >
              <AiOutlineShop style={iconStyles} />
              <Text style={headingStyles}>3- Business</Text>
              {isVisible3 ? (
                <AiFillCaretDown style={pointerStyles} />
              ) : (
                <AiFillCaretUp style={pointerStyles} />
              )}
            </NavLink>
            {isVisible3 ? (
              <ul style={ulStyles}>
                <li>
                  <NavLink
                    to="/AddBusiness"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <RiTeamLine style={iconStyles} />
                    Add Business
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ViewBusiness"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <IoMdAddCircle style={iconStyles} />
                    View Business
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <NavLink
              //to="/Subscribe"
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
              onClick={handleToggleVisibility2}
            >
              <AiOutlineShop style={iconStyles} />
              <Text style={headingStyles}>4- Subscription</Text>
              {isVisible2 ? (
                <AiFillCaretDown style={pointerStyles} />
              ) : (
                <AiFillCaretUp style={pointerStyles} />
              )}
            </NavLink>
            {isVisible2 ? (
              <ul style={ulStyles}>
                <li>
                  <NavLink
                    to="/AddSubscription"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <RiTeamLine style={iconStyles} />
                    Add Subscription
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ViewSubscription"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <IoMdAddCircle style={iconStyles} />
                    View Subscription
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
              onClick={handleToggleVisibility4}
            >
              <AiOutlineShop style={iconStyles} />
              <Text style={headingStyles}>5- Accounting</Text>
              {isVisible4 ? (
                <AiFillCaretDown style={pointerStyles} />
              ) : (
                <AiFillCaretUp style={pointerStyles} />
              )}
            </NavLink>
            {isVisible4 ? (
              <ul style={ulStyles}>
                <li>
                  <NavLink
                    to="/AddExpense"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <RiTeamLine style={iconStyles} />
                    Add Expense
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ViewExpense"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <IoMdAddCircle style={iconStyles} />
                    View Expense
                  </NavLink>
                  <NavLink
                    to="/AddRevenue"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <RiTeamLine style={iconStyles} />
                    Add Revenue
                  </NavLink>
                  <NavLink
                    to="/ViewRevenue"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <RiTeamLine style={iconStyles} />
                    View Revenue
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
              onClick={handleToggleVisibility5}
            >
              <AiOutlineShop style={iconStyles} />
              <Text style={headingStyles}>6- Payment</Text>
              {isVisible5 ? (
                <AiFillCaretDown style={pointerStyles} />
              ) : (
                <AiFillCaretUp style={pointerStyles} />
              )}
            </NavLink>
            {isVisible5 ? (
              <ul style={ulStyles}>
                <li>
                  <NavLink
                    to="/ViewPayment"
                    style={navLinkStyles}
                    activeStyle={{ fontWeight: 'bold' }}
                  >
                    <IoMdAddCircle style={iconStyles} />
                    View Payment
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <NavLink
              to="/Services"
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
            >
              <BiChat style={iconStyles} />
              7- Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ContactUs"
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
            >
              <AiOutlineSetting style={iconStyles} />
              8- Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink

              to="/Faq"
              style={navLinkStyles}
              activeStyle={{ fontWeight: 'bold' }}
            >
              <BiHelpCircle style={iconStyles} />
              9- FAQs
            </NavLink>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default BusinessPanelLeftNavbar;