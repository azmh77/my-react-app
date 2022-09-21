import { useState, useEffect } from "react";
import { FcPrevious } from "react-icons/fc";
import { NavLink } from "react-router-dom";

import "./SideNavBarItem.css";

const SideNavBarItem = ({ item, isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isExpanded === false]);

  if (item.childrens) {
    return (
      <div className="nav-menu">
        <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
          <div
            className="sidebar-title"
            onClick={!isExpanded ? null : () => setIsOpen(!isOpen)}
          >
            <div>
              <i className={item.icon}></i>
              <div>{item.title}</div>
            </div>
            <span
              className={`toggle-btn ${isExpanded ? "d-block" : "d-none"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <FcPrevious />
            </span>
          </div>
          <div className="sidebar-content">
            {item.childrens.map((child, index) => (
              <SideNavBarItem key={index} item={child} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={isOpen ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <div>
            <i className={item.icon}></i>
            <NavLink to={item.path} className="nav-link">
              <div>{item.title}</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
};

export default SideNavBarItem;
