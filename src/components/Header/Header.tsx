import { NavLink } from 'react-router-dom';

import { pages } from '../../App';

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-center">
      <nav>
        <ul className="flex gap-8">
          {pages.map((page, indx) => (
            <li key={indx} className="text-slate-200 text-2xl">
              <NavLink
                className={({ isActive }) => (isActive ? 'text-cyan-300' : 'hover-text-shadow')}
                to={page.path}
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
