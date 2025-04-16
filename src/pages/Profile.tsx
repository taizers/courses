import { adminApiSlice } from '../store/reducers/AdminApiSlice.ts';
import { useGetQueryResponse } from '../types.ts';
import { IUser } from '../models.ts';
import { useShowErrorToast } from '../hooks.ts';
import NoData from '../components/NoData.tsx';
import { useEffect, useState } from 'react';
import UpdateProfileModal from '../modals/UpdateProfileModal.tsx';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const profile = {
  "username": "updatyed",
  "firstName": "prprprpr",
  "lastName": "inf",
  "email": "updated@gmail.com",
  "phone": "+375294852691",
  "role": "ADMIN",
  "isActive": true,
  "age": 19,
  "image": '/courses.webp'
}

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, error } = adminApiSlice.useGetAllTutorsQuery<useGetQueryResponse<IUser>>('');

  const [updateProfile, { data: updateProfileData, error: updateProfileError, isLoading: updateProflieLoading }] =
    adminApiSlice.useUpdateProfileMutation();

  useEffect(() => {
    if (updateProfileData !== undefined) {
      setIsModalOpen(false);
    }
  }, [updateProfileData]);

  useShowErrorToast(error);
  useShowErrorToast(updateProfileError);

  return (
    <div className="max-w-4xl mx-auto p-6 py-16">
      {!profile && <NoData />}
      {profile && (
        <>
          <UpdateProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} isLoading={updateProflieLoading} onUpdateAction={updateProfile} />
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <img
                src={
                  profile.image ||
                  '/user-icon.png'
                }
                alt={profile.username}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <div className={'flex gap-4 items-center'}>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.lastName} {profile.firstName}
                  </h1>
                  <IconButton onClick={() => setIsModalOpen(true)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  @{profile.username}
                </p>
                <div className="flex gap-2 mt-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-sm font-medium rounded ${
                      profile.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {profile.isActive ? 'Активен' : 'Неактивен'}
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 text-sm font-medium rounded ${
                      profile.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Информация о пользователе */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6M9 15h6"
                    />
                  </svg>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Возраст: {profile.age}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;