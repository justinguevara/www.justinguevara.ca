import { Link } from 'react-router-dom';

function MainNavigation (): JSX.Element {
  return (
    <header className="secondary-font header-primary">
        <nav>
        <div className="mobile-menu-bar"><span className="dashicons dashicons-menu" id="open-menu-button"></span></div>
        <div className="header-menu-primary" id="header-navigation">
            <ul className="menu" id="menu-menu-1">
                <li className="current-menu-item current_page_item menu-item menu-item-5 menu-item-home menu-item-object-custom menu-item-type-custom"><Link to="/music">2021</Link></li>
                <li className="current-menu-item current_page_item menu-item menu-item-5 menu-item-home menu-item-object-custom menu-item-type-custom"><Link to="/about">About</Link></li>
                <li className="current-menu-item current_page_item menu-item menu-item-5 menu-item-home menu-item-object-custom menu-item-type-custom"><Link to="/">Home</Link></li>
            </ul>
        </div>
        </nav>
    </header>
  );
};

export default MainNavigation;