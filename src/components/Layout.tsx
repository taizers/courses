import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Menu from './Menu.tsx';
import Footer from './Footer.tsx';

const Layout: FC = () => {
    return (
        <div className={'bg-white shadow dark:bg-gray-800'}>
            <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <Menu />
                    <div className={'p-2'}>
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
        </div>
    );
};

export default Layout;
