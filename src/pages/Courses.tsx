import {FC, useMemo, useState} from "react";
import CoursesInfo from "../components/CoursesInfo/CoursesInfo.tsx";
import CoursesList from "../components/CoursesList/CoursesList.tsx";
import { adminApiSlice } from "../store/reducers/AdminApiSlice.ts";
import { useGetQueryResponse } from "../types.ts";
import { useShowErrorToast } from "../hooks.ts";
import {ICourse} from "../models.ts";
import SearchField from "../components/SearchField.tsx";
import NoData from "../components/NoData.tsx";

const Courses: FC = () => {
    const { data, error } = adminApiSlice.useGetAllCoursesQuery<useGetQueryResponse<ICourse[]>>("");
    const [search, setSearch] = useState("");

    useShowErrorToast(error);

    const filteredCourses = useMemo(() => {
        return data?.filter(course =>
            course.name.toLowerCase().includes(search.toLowerCase())
        ) || [];
    }, [data, search]);

    return (
        <div className="max-w-screen-xl mx-auto p-2">
            <CoursesInfo />
            <SearchField search={search} setSearch={setSearch} placeholder={'Поиск курса'} />
            {!!filteredCourses?.length && <CoursesList courses={filteredCourses}/>}
            {!filteredCourses?.length && <NoData />}
        </div>
    );
};

export default Courses;
