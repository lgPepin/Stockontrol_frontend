import React, { useEffect } from "react";
import "./SideBar.css";
import { SideBarData } from "./SideBarData";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const SideBar = ({ onLogout }) => {
  const [sidebar, setSidebar] = useState(true);
  const [activeSubnav, setActiveSubnav] = useState(null);
  const [showCloseIcon, setShowCloseIcon] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await Axios.get("http://localhost:8080/api/v1/users/logout");
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:8080/api/v1/users/login"
        );

        if (response.data.loggedIn && response.data.user.rows.length > 0) {
          const user = response.data.user.rows[0];
          setUser(user.username);
          setRole(user.role);
        } else {
          console.warn("No hay usuario conectado");
        }
      } catch (error) {
        console.error("Error al recuperar la información del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const filteredSideBarData = SideBarData.map((section) => ({
    ...section,
    subNav: section.subNav.filter((item) => item.roles.includes(role)),
  })).filter((section) => section.roles.includes(role));

  return (
    <>
      <div
        className={
          sidebar ? "sideBar bg-secondary" : "hideSidebar bg-secondary"
        }
      >
        <FaBars
          onClick={showSidebar}
          className={`${!sidebar ? "seeMenuIcon" : "hideIcon"} text-white`}
        />
        <AiOutlineClose
          onClick={showSidebar}
          className={`seeCloseIcon ${
            showCloseIcon ? "showCloseIcon" : ""
          } text-white`}
        />
        <div className="userInfo">
          {user ? (
            <div className="userDetails">
              <p>Bienvenido, {user}!</p>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        <ul className="sideBarList">
          {filteredSideBarData.map((val, key) => {
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
                        <Link
                          to={item.link}
                          className="subNavLink"
                          key={index}
                          onClick={
                            item.title === "Logout" ? handleLogout : null
                          }
                        >
                          <li className="subNavItem">
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
