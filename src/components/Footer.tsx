import { FC } from 'react';
import { getEmailIcon, getInstagramIcon } from "../utils/Icons.tsx";
import { FaTelegramPlane } from 'react-icons/fa';

const Footer: FC = () => {
    const pages = [
        { text: 'Главная', link: '/' },
        { text: 'Курсы', link: 'courses' },
        { text: 'Праздники', link: 'events' },
        { text: 'Контакты', link: 'contacts' },
        { text: 'О нас', link: 'about-us' },
    ];

    const social = [
        { icon: getInstagramIcon(), text: 'Instagram', link: 'https://instagram.com/robotkids' },
        { icon: <FaTelegramPlane/>, text: 'Telegram', link: 'https://t.me/robotkids' },
        { icon: getEmailIcon(), text: 'Email', link: 'mailto:roboklass.by@gmail.com' },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-900/80 py-10 px-4 md:px-10 pb-8 pt-4 mt-4">
            <div className="max-w-7xl mx-auto flex flex-col md:justify-between md:flex-row space-y-8 md:space-y-0 md:space-x-8">

                {/* Pages Section */}
                <div className="flex-1 w-full flex flex-col items-start space-y-2">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300">
                        Страницы
                    </h3>
                    <ul className="space-y-2">
                        {pages.map((page) => (
                            <li key={page.link}>
                                <a
                                    href={page.link}
                                    className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 underline"
                                >
                                    {page.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Networks Section */}
                <div className="flex-1 w-full flex flex-col items-start space-y-2">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300">
                        Социальные сети
                    </h3>
                    <div className="flex flex-col space-y-2">
                        {social.map((network) => (
                            <a
                                key={network.link}
                                href={network.link}
                                target="_blank"
                                className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2"
                            >
                                {network.icon}
                                <span className="sr-only">{network.text}</span>
                                <span className="text-gray-500 dark:text-gray-400 hover:text-blue-600">{network.text}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
