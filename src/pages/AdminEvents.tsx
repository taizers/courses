import {FC, useEffect, useState} from 'react';
import { Button } from 'flowbite-react';
import {useGetQueryResponse} from "../types.ts";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import NoData from "../components/NoData.tsx";
import {useShowErrorToast} from "../hooks.ts";
import moment from "moment";
import CreateUpdateEventModal from "../modals/CreateUpdateEventModal.tsx";
import { IEvent } from '../models.ts';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiImageUrl } from '../constants.ts';

const AdminEvents: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);

    const { data, error } = adminApiSlice.useGetAllEventsQuery<useGetQueryResponse<IEvent[]>>('');

    const [createEvent, { data: createEventData, error: createEventError, isLoading: createEventIsLoading }] =
        adminApiSlice.useCreateEventMutation();
    const [updateEvent, { data: updateEventData, error: updateEventError, isLoading: updateEventIsLoading }] =
        adminApiSlice.useUpdateEventMutation();

    const [deleteEvent, { error: deleteEventError }] =
        adminApiSlice.useDeleteEventMutation();

    useShowErrorToast(error);
    useShowErrorToast(createEventError);
    useShowErrorToast(updateEventError);
    useShowErrorToast(deleteEventError);

    useEffect(() => {
        if (createEventData !== undefined || updateEventData !== undefined) {
            setIsModalOpen(false);
        }
    }, [createEventData, updateEventData]);

    const openModal = () => {
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const openEditModal = (event: IEvent) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleEventAction = (values: FormData) => {
        if (editingEvent) {
            updateEvent({id: editingEvent.id, data: values});
        } else {
            createEvent(values)
        }
    };

    const onDelete = (id: number) => {
        deleteEvent(id);
    };

    return (
      <div className={'py-16 px-6 sm:px-12 max-w-screen-xl mx-auto'}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">События</h2>
          <Button className={'text-black'} onClick={openModal}>
            Создать событие
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
                  Имя
                </th>
                <th scope="col" className="px-6 py-3">
                  Описание
                </th>
                <th scope="col" className="px-6 py-3">
                  Дата события
                </th>
                <th scope="col" className="px-6 py-3">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((event, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <img
                      width={100}
                      src={`${apiImageUrl}${event.pathToImage}`}
                      alt={event.name}
                    />
                  </td>
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">{event.description}</td>
                  <td className="px-6 py-4">
                    {moment(event.dateOfEvent).format('DD.MM.YYYY')}
                  </td>
                  <td className="px-6 py-4 flex">
                    <IconButton
                      onClick={() => openEditModal(event)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(event.id)}
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

        <CreateUpdateEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEventAction={handleEventAction}
          event={editingEvent}
          isLoading={createEventIsLoading || updateEventIsLoading}
        />
      </div>
    );
};

export default AdminEvents;
