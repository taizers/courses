import {FC, useEffect, useState} from 'react';
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
import { ICourse, ITutorShort } from '../models.ts';
import {createToast} from "../utils/toasts.ts";
import { apiImageUrl } from '../constants.ts';

const AdminCourses: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCourse, setEditingCourse] = useState<ICourse>(null!);

    const { data, error } = adminApiSlice.useGetAllCoursesQuery<useGetQueryResponse<ICourse[]>>('');
    const { data: tutors, error: tutorsError } = adminApiSlice.useGetAllTutorsShortQuery<useGetQueryResponse<ITutorShort[]>>('');

    const [importCourses, { data: importCoursesData, error: importCoursesError }] =
        adminApiSlice.useImportCoursesMutation();
    const [createCourse, { data: createCourseData, error: createCourseError, isLoading: createCourseIsLoading }] =
        adminApiSlice.useCreateCourseMutation();
    const [updateCourse, { data: updateCourseData, error: updateCourseError, isLoading: updateCourseIsLoading }] =
        adminApiSlice.useUpdateCourseMutation();
    const [deleteCourse, { error: deleteCourseError }] =
        adminApiSlice.useDeleteCourseMutation();

    useShowErrorToast(error);
    useShowErrorToast(createCourseError);
    useShowErrorToast(updateCourseError);
    useShowErrorToast(deleteCourseError);
    useShowErrorToast(importCoursesError);
    useShowErrorToast(tutorsError);

    useEffect(() => {
        if (importCoursesData) {
            createToast.success('Загружено');
        }
    }, [importCoursesData]);

    useEffect(() => {
        if (createCourseData !== undefined || updateCourseData !== undefined) {
            setIsModalOpen(false);
        }
    }, [createCourseData, updateCourseData]);

    const openModal = () => {
        setEditingCourse(null!);
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
        importCourses(data);
    };

    return (
      <div className={'py-16 px-6 sm:px-12 max-w-screen-xl mx-auto'}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Курсы</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button className={'text-black'} onClick={onDownloadCourses}>
              Выгрузить курсы
            </Button>
            <Button className={'text-black'} onClick={openModal}>
              Создать курс
            </Button>
          </div>
        </div>

        {!!data?.length && (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Фото
                </th>
                <th scope="col" className="px-6 py-3">
                  Имя
                </th>
                <th scope="col" className="px-6 py-3">
                  Описание
                </th>
                <th scope="col" className="px-6 py-3">
                  Дата начала
                </th>
                <th scope="col" className="px-6 py-3">
                  Дата окончания
                </th>
                <th scope="col" className="px-6 py-3">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((course, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <img width={100} src={`${apiImageUrl}${course.pathToImage}`} alt={course.name} />
                  </td>
                  <td className="px-6 py-4">{course.name}</td>
                  <td className="px-6 py-4">{course.description}</td>
                  <td className="px-6 py-4">
                    {moment(course.startDate).format('DD.MM.YYYY')}
                  </td>
                  <td className="px-6 py-4">
                    {moment(course.endDate).format('DD.MM.YYYY')}
                  </td>
                  <td className="px-6 py-4 flex">
                    <IconButton
                      onClick={() => openEditModal(course)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(course.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!data?.length && <NoData />}

        <CreateUpdateCourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCourseAction={handleCourseAction}
          course={editingCourse}
          tutors={tutors}
          isLoading={createCourseIsLoading || updateCourseIsLoading}
        />
      </div>
    );
};

export default AdminCourses;
