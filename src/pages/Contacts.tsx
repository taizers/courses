import { FaPhone, FaEnvelope, FaInstagram, FaTelegramPlane, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './Contacts.css';
import {address} from "../constants.ts";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <section className="contact-intro">
                <h2>Свяжитесь с нами</h2>
                <p>Если у вас есть вопросы о занятиях, записях или расписании, свяжитесь с нами любым удобным
                    способом.</p>
            </section>

            <section className="contact-info">
                <h3><FaMapMarkerAlt/> Наш адрес</h3>
                <p>{address}</p>
            </section>

            <section className="contact-phones">
                <h3><FaPhone/> Телефоны</h3>
                <p>📞 +375 (44) 752-25-71</p>
                <p>📞 +375 (25) 954-79-96</p>
            </section>

            <section className="contact-email">
                <h3><FaEnvelope/> Email</h3>
                <p>📧 <a href="mailto:roboklass.by@gmail.com">roboklass.by@gmail.com</a></p>
            </section>

            <section className="contact-socials">
                <h3>Мы в соцсетях</h3>
                <p>
                    <a href="https://instagram.com/robotkids" target="_blank" rel="noopener noreferrer">
                        <FaInstagram/> Instagram
                    </a>
                </p>
                <p>
                    <a href="https://t.me/robotkids" target="_blank" rel="noopener noreferrer">
                        <FaTelegramPlane/> Telegram
                    </a>
                </p>
            </section>

            <section className="contact-hours">
                <h3><FaClock/> Расписание работы</h3>
                <p>Пн — Пт: 10:00 - 19:00</p>
                <p>Сб: 10:00 - 14:00</p>
                <p>Вс: выходной</p>
            </section>

            <section className="contact-map">
                <h3>Как нас найти</h3>
                <div className="map-container">
                    <iframe title={'Карта'}
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa13d7cb62cd32600a0700eaf7148bb0cec8f83f7b39e336bc75533dbd3061a59&amp;source=constructor"
                            width="100%" height="500" frameBorder="0"></iframe>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
