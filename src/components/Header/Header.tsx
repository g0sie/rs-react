import { Component } from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../pages/routes';

export class Header extends Component {
  render() {
    return (
      <header className="h-16 flex items-center justify-center">
        <nav>
          <ul className="flex gap-8">
            {routes.map((route, indx) => (
              <li key={indx} className="text-slate-200 text-2xl">
                <NavLink
                  className={({ isActive }) => (isActive ? 'text-cyan-300' : 'hover-text-shadow')}
                  to={route.path}
                >
                  {route.navName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
