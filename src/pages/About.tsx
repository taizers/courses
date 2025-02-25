import './About.css';
import {address} from "../constants.ts";

const About = () => {
    return (
        <div className="about-page">
            <section className="about-intro">
                <h2>О нас</h2>
                <p>Мы обучаем детей робототехнике, помогая развивать логическое мышление, инженерные навыки и командную работу. Наши курсы подходят для разных возрастов и уровней подготовки.</p>
            </section>

            <section className="our-mission">
                <h3>Наша миссия</h3>
                <p>Мы верим, что обучение через практику — лучший способ освоить технологии. Поэтому наши занятия построены на реальных проектах, экспериментах и работе с современными конструкторами.</p>
            </section>

            <section className="our-team">
                <h3>Наша команда</h3>
                <p>Наши преподаватели — инженеры, программисты и педагоги с опытом работы в IT и образовании.</p>
            </section>

            <section className="our-location">
                <h3>Где мы находимся</h3>
                <p>Наши занятия проходят по адресу {address}</p>
            </section>
        </div>
    );
};

export default About;
