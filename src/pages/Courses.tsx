import {FC} from "react";
import CoursesInfo from "../components/CoursesInfo/CoursesInfo.tsx";
import CoursesList from "../components/CoursesList/CoursesList.tsx";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import {useGetQueryResponse} from "../types.ts";
import {useShowErrorToast} from "../hooks.ts";
import {courses} from "../mocks.ts";

const Courses: FC = () => {
    const { data, error } = adminApiSlice.useGetAllCoursesQuery<useGetQueryResponse<any[]>>('');

    useShowErrorToast(error);

    return (
        <div className="max-w-screen-xl mx-auto p-2">
            <CoursesInfo />
            <CoursesList courses={data} />
        </div>
    );
};

export default Courses;