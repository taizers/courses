import { FC, useMemo } from 'react';
import Carousel from "./Carousel.tsx";
import { adminApiSlice } from '../store/reducers/AdminApiSlice.ts';
import { useGetQueryResponse } from '../types.ts';
import { ITutor } from '../models.ts';
import { useShowErrorToast } from '../hooks.ts';
import NoData from './NoData.tsx';

const OurTeachers: FC = () => {
    const { data: tutors, error: tutorsError } = adminApiSlice.useGetAllTutorsQuery<useGetQueryResponse<ITutor[]>>('');

    useShowErrorToast(tutorsError);

    const teachers = useMemo(() => {
        if (!tutors) return [];
        return tutors.map(item => ({
            id: item.id,
            name: item.lastname + item.firstname,
            degree: '',
            image: item.image
        }))
    }, [tutors]);

    return (
      <div className="max-w-screen-xl mx-auto space-y-6 mt-8">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 text-center">
          Наши преподаватели
        </h3>
        {!teachers?.length && <NoData />}
        {!!teachers?.length && <Carousel cards={teachers} indicators={false} />}
      </div>
    );
};

export default OurTeachers;
