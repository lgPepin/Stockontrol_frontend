import React from "react";
import "./SideBar.css";
import { SideBarData } from "./SideBarData";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [activeSubnav, setActiveSubnav] = useState(null);
  const [showCloseIcon, setShowCloseIcon] = useState(true);

  const showSidebar = () => {
    if (sidebar) {
      setActiveSubnav(null);
    }
    setSidebar(!sidebar);
    if (!sidebar) {
      setTimeout(() => {
        setShowCloseIcon(true);
      }, 350);
    } else {
      setShowCloseIcon(false);
    }
  };

  const toggleSubnav = (index) => {
    if (!sidebar) {
      setSidebar(true);
      setShowCloseIcon(true);
    }
    setActiveSubnav(activeSubnav === index ? null : index);
  };

  return (
    <>
      <div
        className={
          sidebar ? "sideBar bg-secondary" : "hideSidebar bg-secondary"
        }
      >
        <FaBars
          onClick={showSidebar}
          className={!sidebar ? "seeMenuIcon" : "hideIcon"}
        />
        <AiOutlineClose
          onClick={showSidebar}
          className={`seeCloseIcon ${showCloseIcon ? "showCloseIcon" : ""}`}
        />
        <ul className="sideBarList">
          {SideBarData.map((val, key) => {
            return (
              <li key={key}>
                <div
                  className="rowList"
                  id={window.location.pathname === val.link ? "active" : ""}
                  onClick={val.subNav ? () => toggleSubnav(key) : null}
                >
                  <div
                    id="icon"
                    onClick={!sidebar ? () => toggleSubnav(key) : null}
                  >
                    {val.icon}
                  </div>
                  <div className={!sidebar ? "hideIcon" : ""} id="title">
                    {val.title}
                  </div>
                  <div>
                    {sidebar && val.subNav && activeSubnav === key
                      ? val.iconOpened
                      : null}
                    {sidebar && val.subNav && activeSubnav !== key
                      ? val.iconClosed
                      : null}
                  </div>
                </div>
                {val.subNav && activeSubnav === key && sidebar && (
                  <ul className="subNavList">
                    {val.subNav.map((item, index) => {
                      return (
                        <Link to={item.link} className="subNavLink">
                          <li key={index} className="subNavItem">
                            <div id="icon">{item.icon}</div>
                            <div id="title">{item.title}</div>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
