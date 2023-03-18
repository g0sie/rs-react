import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound404 from './pages/404';

export const App = () => {
  return (
    <div className="App">
      <header style={{ height: '5rem', backgroundColor: 'darkcyan' }}>
        <h1>Hello world</h1>
      </header>
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
