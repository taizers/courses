import {FC, useEffect, useState} from 'react';
import { Button } from 'flowbite-react';
import {useGetQueryResponse} from "../types.ts";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import NoData from "../components/NoData.tsx";
import {useShowErrorToast} from "../hooks.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CreateUpdateTutorModal from "../modals/CreateUpdateTutorModal.tsx";
import {ITutor} from "../models.ts";
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import { apiImageUrl } from '../constants.ts';

const AdminTutors: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTutor, setEditingTutor] = useState<ITutor | null>(null);

  const { data, error } = adminApiSlice.useGetAllTutorsQuery<useGetQueryResponse<ITutor[]>>('');
  
  const [createTutor, { data: createTutorData, error: createTutorError, isLoading: createTutorIsLoading }] =
    adminApiSlice.useCreateTutorMutation();
  const [updateTutor, { data: updateTutorData, error: updateTutorError, isLoading: updateTutorIsLoading }] =
    adminApiSlice.useUpdateTutorMutation();
  const [deleteTutor, { error: deleteTutorError }] =
    adminApiSlice.useDeleteTutorMutation();
  const [changeStatus, { error: changeStatusError }] =
    adminApiSlice.useChangePersonStatusMutation();

  useShowErrorToast(error);
  useShowErrorToast(createTutorError);
  useShowErrorToast(updateTutorError);
  useShowErrorToast(deleteTutorError);
  useShowErrorToast(changeStatusError);


  useEffect(() => {
    if (createTutorData !== undefined || updateTutorData !== undefined) {
      setIsModalOpen(false);
    }
  }, [createTutorData, updateTutorData]);

  const openModal = () => {
    setEditingTutor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tutor: ITutor) => {
    setEditingTutor(tutor);
    setIsModalOpen(true);
  };

  const handleTutorAction = (values: FormData) => {
    if (editingTutor) {
      updateTutor({id: editingTutor.id, data: values});
    } else {
      createTutor(values)
    }
  };

  const onDelete = (id: number) => {
    deleteTutor(id);
  };

  return (
    <div className={'py-16 px-6 sm:px-12 max-w-screen-xl mx-auto'}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Преподаватели</h2>
        <Button className={'text-black'} onClick={openModal}>
          Создать преподавателя
        </Button>
      </div>

      {!!data?.length && (
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Фото
              </th>
              <th scope="col" className="px-6 py-3">
                Имя пользователя
              </th>
              <th scope="col" className="px-6 py-3">
                Имя
              </th>
              <th scope="col" className="px-6 py-3">
                Фомилия
              </th>
              <th scope="col" className="px-6 py-3">
                Почта
              </th>
              <th scope="col" className="px-6 py-3">
                Пароль
              </th>
              <th scope="col" className="px-6 py-3">
                Телефон
              </th>
              <th scope="col" className="px-6 py-3">
                Возраст
              </th>
              <th scope="col" className="px-6 py-3">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((tutor, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <img width={100} src={`${apiImageUrl}${tutor.pathToImage}`} alt={tutor.username} />
                </td>
                <td className="px-6 py-4">{tutor.username}</td>
                <td className="px-6 py-4">{tutor.firstName}</td>
                <td className="px-6 py-4">{tutor.lastName}</td>
                <td className="px-6 py-4">{tutor.email}</td>
                <td className="px-6 py-4">{tutor.password}</td>
                <td className="px-6 py-4">{tutor.phone}</td>
                <td className="px-6 py-4">{tutor.age}</td>
                <td className="px-6 py-4 flex">
                  <IconButton
                    onClick={() => openEditModal(tutor)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => changeStatus(tutor.username)}
                    aria-label="changeStatus"
                  >
                    {tutor.isActive ? (
                      <Tooltip title="Block">
                        <BlockIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="UnBlock">
                        <CheckIcon />
                      </Tooltip>
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(tutor.id)}
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

      <CreateUpdateTutorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTutorAction={handleTutorAction}
        tutor={editingTutor as ITutor}
        isLoading={updateTutorIsLoading || createTutorIsLoading}
      />
    </div>
  );
};

export default AdminTutors;
