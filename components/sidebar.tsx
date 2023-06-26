import React from 'react';
import './sidebar.css';

export const Sidebar = () => {
  return (
    <div className="collapsed-sidebar-menu">
      <div className="collapsed-sidebar-menu-item">
        <p>Item 1</p>
      </div>
      <div className="collapsed-sidebar-menu-item">
        <p>Item 2</p>
      </div>
      <div className="collapsed-sidebar-menu-item">
        <p>Item 3</p>
      </div>
      {/* Add more items as needed */}
    </div>
  );
};
