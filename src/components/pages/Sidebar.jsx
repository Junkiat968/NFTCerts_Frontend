import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

function Sidebar() {
    return (
    <Menu>
      <a className="menu-item" href="/">
        ICT1001 Introuction to Computing
      </a>
      <a className="menu-item" href="/manageGrades">
        ICT2102 Introduction to Software Engineering
      </a>
    </Menu>
  );
};

export default Sidebar;