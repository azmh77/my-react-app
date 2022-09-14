import { useState } from "react";

import item from "../../data/SidebarData.json";
import Wrapper from "./../../hoc/Wrapper";

import SideNavBarItem from "./SideNavBar_Item/SideNavBarItem";

import "./SideNavBar.css";

const SideNavBar = () => {
  const [isExpanded, setExpendState] = useState(true);

  return (
    <Wrapper>
      <div
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
        }
      >
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <h2>RHPM</h2>
              </div>
            )}
            <button
              className={
                isExpanded
                  ? "hamburger hamburger-in"
                  : "hamburger hamburger-out"
              }
              onClick={() => setExpendState(!isExpanded)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          {item.map((item, index) => (
            <SideNavBarItem key={index} item={item} isExpanded={isExpanded} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default SideNavBar;
