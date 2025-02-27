import { Link } from 'react-router-dom';
import { useState } from "react";

function MainNavigation ({root_class = 'default'}): JSX.Element {
  const [show_mobile_menu, setShowMobileMenu] = useState(false);

  const handleMenuIconClick = function () {
    setShowMobileMenu(!show_mobile_menu);
  };

  const  navigation_items_container_classes = ['header-menu-primary'];
  if (show_mobile_menu === false) {
    navigation_items_container_classes.push('hide');
  }
  const emphasize_class = show_mobile_menu === true ? 'jg-emphasize' : '';

  return (
    <header className={`secondary-font header-primary ${root_class} ${emphasize_class}`}>
      <nav>
        <div className="jg-menu-icon" onClick={handleMenuIconClick}></div>
        <div className={navigation_items_container_classes.join(" ")} id="header-navigation">
          <ul className="menu" id="menu-menu-1">
            <li className="menu-item"><Link to="/tools">Tools</Link></li>
            <li className="menu-item"><Link to="/summary">Summary</Link></li>
            <li className="menu-item"><Link to="/about">About</Link></li>
            <li className="menu-item"><Link to="/">Home</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;