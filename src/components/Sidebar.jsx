import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

function Navbar() {
    return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/manageGrades">
        Manage Grades
      </a>
      <a className="menu-item" href="/transactionLogs">
        Transaction Logs
      </a>
      <a className="menu-item" href="/purchaseTokens">
        Purchase Tokens
      </a>
    </Menu>
  );
};
export default Navbar;