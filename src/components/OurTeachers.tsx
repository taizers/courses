import { FC } from "react";
import Carousel from "./Carousel.tsx";

const OurTeachers: FC = () => {
    const teachers = [
        {
            id: 1,
            name: "John Doe",
            degree: "PhD in Computer Science",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Jane Smith",
            degree: "Master of Mathematics",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Emily Johnson",
            degree: "Bachelor of Physics",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Alice Brown",
            degree: "MSc in Chemistry",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "Bob White",
            degree: "PhD in Biology",
            image: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto space-y-6 mt-8">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 text-center">
                Наши преподаватели
            </h3>
            <Carousel cards={teachers} indicators={false} />
        </div>
    );
};

export default OurTeachers;
