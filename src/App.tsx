import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

import routes from './pages/routes';
import NotFound404 from './pages/404';

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <Routes>
        {routes.map((route, indx) => (
          <Route path={route.path} element={route.pageElement} key={indx} />
        ))}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export const WrappedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
