import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from 'assets/img/background.jpg';
import logo from 'assets/img/logo.png';

import appRoutes from 'routes/app.jsx';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    }
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1
      ? 'active'
      : '';
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: 'url(' + imagine + ')'
    };
    return (<div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
      <div className="sidebar-background" style={sidebarBackground}></div>
      <div className="logo">
        <NavLink to="/dashboard" className="navItem simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
        </NavLink>
        <a href="/" className="simple-text logo-normal">&nbsp;</a>

      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {
            this.state.width <= 991
              ? (<HeaderLinks />)
              : null
          }
          {
            appRoutes.map((prop, key) => {
              if (!prop.showInSidebar)
                return null;
              if (!prop.redirect)
                return (<li className={prop.upgrade
                  ? "active active-pro"
                  : this.activeRoute(prop.path)} key={key}>
                  <NavLink to={prop.path} className="nav-link" activeClassName="active">
                    <i className={prop.icon}></i>
                    <p>{prop.name}</p>
                  </NavLink>
                </li>);
              return null;
            })
          }
        </ul>
      </div>
    </div>);
  }
}

export default Sidebar;
