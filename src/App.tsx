import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About';
import NotFound404 from './pages/404';
import Forms from './pages/Forms/Forms';

export const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="forms" element={<Forms />} />
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
