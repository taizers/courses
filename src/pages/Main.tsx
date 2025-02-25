import { FC } from 'react';

import FeedBackForm from "../components/FeedBackForm.tsx";
import OurTeachers from "../components/OurTeachers.tsx";
import Questions from "../components/Questions.tsx";
import Info from "../components/Info.tsx";

const Main: FC = () => {
    return (
        <div>
            <Info />
            <Questions />
            <OurTeachers />
            <FeedBackForm />
        </div>
    );
};

export default Main;