import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import NotFound404 from './pages/404';

export const App = () => {
  return (
    <div className="h-screen bg-slate-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
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
