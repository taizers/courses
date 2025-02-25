import { useParams } from 'react-router-dom';
import { adminApiSlice } from "../store/reducers/AdminApiSlice.ts";
import { useGetQueryResponse } from "../types.ts";
import { useShowErrorToast } from "../hooks.ts";
import NoData from "../components/NoData.tsx";
import {courses} from "../mocks.ts";

const Course = () => {
    const { id } = useParams();
    const { data, error } = adminApiSlice.useGetCourseQuery<useGetQueryResponse<any>>(id);

    // const data = courses.find((e) => e.id.toString() === id);

    useShowErrorToast(error);

    return (
        <div className="max-w-screen-xl mx-auto p-6 min-h-screen flex flex-col items-center">
            {!!data && (
                <div className="w-full p-6 border rounded-lg shadow-lg bg-white flex flex-col">
                    <img
                        src={data.image?.startsWith('/') ? data.image : '/placeholder.jpg'}
                        alt={data.name}
                        className="event-image self-center"
                    />
                    <h1 className="text-3xl font-extrabold mt-6 text-gray-900">{data.name}</h1>
                    <p className="text-gray-700 text-base mt-4 leading-relaxed">{data.description}</p>
                    <div className="mt-3 text-gray-500">
                        <p className="text-sm italic">Дата начала: {new Date(data.start).toLocaleDateString()}</p>
                        <p className="text-sm italic">Дата окончания: {new Date(data.end).toLocaleDateString()}</p>
                    </div>
                </div>
            )}
            {!data && <NoData />}
        </div>
    );
};

export default Course;
