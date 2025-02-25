import { FC } from 'react';
import './CoursesInfo.css';

const info = [
    {
        imgSrc: '/format.svg',
        title: 'Формат занятий',
        description: 'Занятия проходят по нескольким адресам в Гродно с преподавателем',
    },
    {
        imgSrc: '/group.svg',
        title: 'Групповые занятия',
        description: 'Дети обучаются в мини-группах по 8 человек. Программа обучения и расписание общие для всех учеников в группе',
    },
    {
        imgSrc: '/location.svg',
        title: 'Местонахождение',
        description: 'Много филиалов, которых Вы точно найдёте рядом с домом',
    },
];

const CoursesInfo: FC = () => {
    return (
        <div className={'courses-info'}>
            <h2 className="title">Оффлайн занятия по робототехнике для детей</h2>
            <div className="content">
                <div className="image-wrapper">
                    <img
                        src="/courses1.webp"
                        alt="courses"
                        className="image"
                    />
                </div>
                <div className="info">
                    {info.map((item, index) => (
                        <div key={index} className="info-item">
                            <img src={item.imgSrc} alt={item.title} width={60} height={60} />
                            <div>
                                <h6>{item.title}</h6>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesInfo;
