import Home from './Home/Home';
import About from './About';
import Forms from './Forms/Forms';

interface route {
  path: string;
  navName: string;
  pageElement: JSX.Element;
}

const routes: route[] = [
  { navName: 'Home', path: '/', pageElement: <Home /> },
  { navName: 'About Us', path: 'about', pageElement: <About /> },
  { navName: 'Forms', path: 'forms', pageElement: <Forms /> },
];

export default routes;
