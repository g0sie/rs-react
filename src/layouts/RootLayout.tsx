import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
