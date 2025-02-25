import {FC, useEffect, useState} from 'react';
import { Button } from 'flowbite-react';
import UserCreateModal from '../modals/CreateUpdateUserModal.tsx';
import {IResponsePaginatedData, useGetQueryResponce} from "../types.ts";
import {adminApiSlice} from "../store/reducers/AdminApiSlice.ts";
import NoData from "../components/NoData.tsx";
import {useShowErrorToast} from "../hooks.ts";

interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    isActive: boolean;
    age: number;
    image: string;
}

const Users: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { data, error } = adminApiSlice.useGetAllTutorsQuery<useGetQueryResponce<any[]>>('');

    const [createUser, { data: createUserData, error: createUserError, isLoading: createUserIsLoading }] =
        adminApiSlice.useCreateTutorMutation();
    const [updateUser, { data: updateUserData, error: updateUserError, isLoading: updateUserIsLoading }] =
        adminApiSlice.useUpdateTutorMutation();

    useShowErrorToast(error);
    useShowErrorToast(createUserError);
    useShowErrorToast(updateUserError);

    useEffect(() => {
        if (createUserData !== undefined || updateUserData !== undefined) {
            setIsModalOpen(false);
        }
    }, [createUserData, updateUserData]);

    const openModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleUserAction = (values: FormData) => {
        if (editingUser) {
            updateUser({id: editingUser.id, data: values});
        } else {
            createUser(values)
        }
    };

    return (
        <div className={'py-16 px-6 sm:px-12 max-w-screen-xl mx-auto'}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Пользователи</h2>
                <Button className={'text-black'} onClick={openModal}>Создать пользователя</Button>
            </div>

            {!!data?.length && <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Имя пользователя</th>
                    <th scope="col" className="px-6 py-3">Имя</th>
                    <th scope="col" className="px-6 py-3">Фамилия</th>
                    <th scope="col" className="px-6 py-3">Почта</th>
                    <th scope="col" className="px-6 py-3">Телефон</th>
                    <th scope="col" className="px-6 py-3">Роль</th>
                    <th scope="col" className="px-6 py-3">Активен</th>
                    <th scope="col" className="px-6 py-3">Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user.firstName}</td>
                        <td className="px-6 py-4">{user.lastName}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">{user.isActive ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4">
                            <Button className={'text-black'} onClick={() => openEditModal(user)}>Редактировать</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>}

            {!data?.length && <NoData />}

            <UserCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUserAction={handleUserAction}
                user={editingUser}
            />
        </div>
    );
};

export default Users;
