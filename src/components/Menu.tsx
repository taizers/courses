import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../assets/react.svg';
import { useAppDispatch, useAppSelector } from '../hooks.ts';
import { setMenuHeight } from '../store/reducers/AppSlice.ts';
import { getLoginIcon, getUserIcon } from "../utils/Icons.tsx";
import AuthModal from "../modals/AuthModal.tsx";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import {localLogout} from "../store/reducers/AuthSlice.ts";

const pages = [
    { link: '/courses', label: 'Курсы' },
    { link: '/events', label: 'Праздники' },
    { link: '/contacts', label: 'Контакты' },
    { link: '/about-us', label: 'О нас' },
];

const Menu: FC = () => {
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useAppDispatch();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); // состояние для мобильного меню
    const userMenuRef = useRef<HTMLDivElement>(null);

    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (menuRef.current) {
            dispatch(setMenuHeight(menuRef.current.offsetHeight));
        }

        const handleResize = () => {
            if (menuRef.current) {
                dispatch(setMenuHeight(menuRef.current.offsetHeight));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                !event.target.closest('.user-icon')
            ) {
                setIsUserMenuOpen(false);
            }
            if (
                !event.target.closest('#mega-menu-icons') &&
                !event.target.closest('.p-2')
            ) {
                setIsMobileMenuOpen(false); // скрыть мобильное меню при клике вне меню
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const activeStyles =
        'block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700';
    const unActiveStyles =
        'block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700';

    const onNavClick = (e: any, link: string) => {
        e.preventDefault();
        history(link);
        setIsMobileMenuOpen(false); // Закрыть мобильное меню при клике на ссылку
    };

    const onLogoClick = (e: any) => {
        e.preventDefault();
        history('/');
    };

    const toggleAuthModal = () => {
        setIsAuthModalOpen((prev) => !prev);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev); // переключение мобильного меню
    };

    const onUsersClick = () => {
        setIsUserMenuOpen(false);
        history('/users');
    }

    const onCoursesClick = () => {
        setIsUserMenuOpen(false);
        history('/admin-courses');
    }

    const onEventsClick = () => {
        setIsUserMenuOpen(false);
        history('/admin-events');
    };

    const onLogoutClick = () => {
        setIsUserMenuOpen(false);
        dispatch(localLogout());
        history('/');
    };

    return (
        <>
            <nav ref={menuRef} className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                    <a href="#" onClick={onLogoClick} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Paketomir Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Робокласс</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {user?.username ? (
                            <div className="relative user-icon">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    {getUserIcon()}
                                    <span className="sr-only">User Menu</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border dark:bg-gray-800 z-20">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                                Профиль
                                            </li>
                                            <li onClick={onCoursesClick} className="px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                                Курсы
                                            </li>
                                            <li onClick={onEventsClick} className="px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                                События
                                            </li>
                                            <li onClick={onUsersClick} className="px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                                Пользователи
                                            </li>
                                            <li onClick={onLogoutClick} className="px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer">
                                                Выйти
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={toggleAuthModal}
                                className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                {getLoginIcon()}
                                <span className="sr-only">Login</span>
                            </button>
                        )}
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div id="mega-menu-icons" className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                            {pages.map((page, index) => (
                                <li key={`${index} ${page.label}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => onNavClick(e, page.link)}
                                        className={location.pathname === page.link ? activeStyles : unActiveStyles}
                                        aria-current="page"
                                    >
                                        {page.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />}
        </>
    );
};

export default Menu;
