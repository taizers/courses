import { useParams } from 'react-router-dom';
import { adminApiSlice } from "../store/reducers/AdminApiSlice.ts";
import { useGetQueryResponse } from "../types.ts";
import { useAppSelector, useShowErrorToast } from '../hooks.ts';
import NoData from "../components/NoData.tsx";
import { Button } from 'flowbite-react';
import { apiImageUrl } from '../constants.ts';

const Course = () => {
    const { id } = useParams();
    const { data, error } = adminApiSlice.useGetCourseQuery<useGetQueryResponse<any>>(id);
    const { user } = useAppSelector((state) => state.auth);

    const [courseRecord, { error: courseRecordError, isLoading: courseRecordLoading }] =
      adminApiSlice.useCourseRecordMutation();

    useShowErrorToast(error);
    useShowErrorToast(courseRecordError);

    return (
      <div className="max-w-screen-xl mx-auto p-6 min-h-screen flex flex-col items-center">
        {!!data && (
          <div className="w-full p-6 border rounded-lg shadow-lg bg-white flex flex-col">
            <img
              src={
                data.image?.startsWith('/')
                  ? `${apiImageUrl}${data.pathToImage}`
                  : '/placeholder.jpg'
              }
              alt={data.name}
              className="event-image self-center"
            />
            <h1 className="text-3xl font-extrabold mt-6 text-gray-900">
              {data.name}
            </h1>
            <p className="text-gray-700 text-base mt-4 leading-relaxed">
              {data.description}
            </p>
            <div className="mt-3 text-gray-500">
              <p className="text-sm italic">
                Дата начала: {new Date(data.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm italic">
                Дата окончания: {new Date(data.endDate).toLocaleDateString()}
              </p>
              {user?.username && !data.isRecorded && (
                <Button
                  disabled={courseRecordLoading}
                  className={'text-black'}
                  onClick={() => courseRecord(id)}
                >
                  Записаться на курс
                </Button>
              )}
            </div>
          </div>
        )}
        {!data && <NoData />}
      </div>
    );
};

export default Course;
