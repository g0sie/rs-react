import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import Home from './pages/Home/Home';
import About from './pages/About';
import Forms from './pages/Forms/Forms';
import NotFound404 from './pages/404';

import { Provider } from 'react-redux';
import { store } from './store';

interface page {
  path: string;
  name: string;
  element: JSX.Element;
}

export const pages: page[] = [
  { name: 'Home', path: '/', element: <Home /> },
  { name: 'About', path: 'about', element: <About /> },
  { name: 'My Cards', path: 'forms', element: <Forms /> },
];

export const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    {pages.map((page, indx) => (
      <Route path={page.path} element={page.element} key={indx} />
    ))}
    <Route path="*" element={<NotFound404 />} />
  </Route>
);

const router = createBrowserRouter(routes);

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
