import {FC, useEffect, useRef, useState} from 'react';
import { Button } from 'flowbite-react';
import {useGetQueryResponse} from "../types.ts";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import NoData from "../components/NoData.tsx";
import {useShowErrorToast} from "../hooks.ts";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CreateUpdateCourseModal from "../modals/CreateUpdateCourseModal.tsx";
import {ICourse} from "../models.ts";

const AdminCourses: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);

    const setSubmittingRef = useRef<(isSubmitting: boolean) => void>(null!);

    const { data, error } = adminApiSlice.useGetAllCoursesQuery<useGetQueryResponse<ICourse[]>>('');

    const [createCourse, { data: createCourseData, error: createCourseError, isLoading: createCourseIsLoading }] =
        adminApiSlice.useCreateCourseMutation();
    const [updateCourse, { data: updateCourseData, error: updateCourseError, isLoading: updateCourseIsLoading }] =
        adminApiSlice.useUpdateCourseMutation();
    const [deleteCourse, { data: deleteCourseData, error: deleteCourseError, isLoading: deleteCourseIsLoading }] =
        adminApiSlice.useDeleteCourseMutation();

    useShowErrorToast(error);
    useShowErrorToast(createCourseError);
    useShowErrorToast(updateCourseError);
    useShowErrorToast(deleteCourseError);

    useEffect(() => {
        setSubmittingRef.current && setSubmittingRef.current(false);
    }, [createCourseError, updateCourseError]);

    useEffect(() => {
        if (createCourseData !== undefined || updateCourseData !== undefined) {
            setIsModalOpen(false);
            setSubmittingRef.current && setSubmittingRef.current(false);
        }
    }, [createCourseData, updateCourseData]);

    const openModal = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const openEditModal = (course: ICourse) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleCourseAction = (values: FormData) => {
        if (editingCourse) {
            updateCourse({id: editingCourse.id, data: values});
        } else {
            createCourse(values)
        }
    };

    const onDelete = (id: number) => {
        deleteCourse(id);
    };

    const onDownloadCourses = () => {
        if (!data?.length) return;

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'courses.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    };

    return (
        <div className={'py-16 px-6 sm:px-12 max-w-screen-xl mx-auto'}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Курсы</h2>
                <div style={{display: 'flex', gap: '10px'}}>
                    {!!data?.length && <Button className={'text-black'} onClick={onDownloadCourses}>Выгрузить курсы</Button>}
                    <Button className={'text-black'} onClick={openModal}>Создать курс</Button>
                </div>
            </div>

            {!!data?.length && <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Фото</th>
                    <th scope="col" className="px-6 py-3">Имя</th>
                    <th scope="col" className="px-6 py-3">Описание</th>
                    <th scope="col" className="px-6 py-3">Дата начала</th>
                    <th scope="col" className="px-6 py-3">Дата окончания</th>
                    <th scope="col" className="px-6 py-3">Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((course, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4">
                            <img width={100} src={course.image} alt={course.name} />
                        </td>
                        <td className="px-6 py-4">{course.name}</td>
                        <td className="px-6 py-4">{course.description}</td>
                        <td className="px-6 py-4">{moment(course.startDate).format('DD.MM.YYYY')}</td>
                        <td className="px-6 py-4">{moment(course.endDate).format('DD.MM.YYYY')}</td>
                        <td className="px-6 py-4 flex">
                            <IconButton onClick={() => openEditModal(course)} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDelete(course.id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>}

            {!data?.length && <NoData />}

            <CreateUpdateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCourseAction={handleCourseAction}
                course={editingCourse}
                setSubmittingRef={setSubmittingRef}
            />
        </div>
    );
};

export default AdminCourses;
