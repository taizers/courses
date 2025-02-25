import { FC } from 'react';
import { Modal, Button, FileInput } from 'flowbite-react';
import {Formik, Form, ErrorMessage} from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import {userFields, userValidationSchema} from "../utils/formFields.ts";

interface UserCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserAction: (values: any) => void;
    user?: any;
}

const CreateUpdateUserModal: FC<UserCreateModalProps> = ({ isOpen, onClose, onUserAction, user }) => {
    const initialValues = user
        ? {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            password: '',
            email: user.email,
            phone: user.phone,
            image: user.image || ''
        }
        : {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            image: ''
        };

    const onSubmit = (values: typeof initialValues) => {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('password', values.password);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('image', values.image);
        onUserAction(formData);
    }

    return (
        <Modal show={isOpen} onClose={onClose} className="relative">
            <Modal.Header>{user ? 'Редактировать пользователя' : 'Создать пользователя'}</Modal.Header>
            <Modal.Body className="overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={userValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit, setFieldValue, isSubmitting }) => (
                            <Form style={{maxHeight: '80vh', overflowY: 'auto'}} className={'p-2'}
                                  onSubmit={handleSubmit}>
                                {userFields.map((field) => (
                                    <FormFieldComponent
                                        key={field.name}
                                        field={field}
                                    />
                                ))}

                                <div className="space-y-2">
                                    <label htmlFor="image" className="text-gray-700 dark:text-gray-300 font-medium">
                                        Изображение
                                    </label>
                                    <FileInput
                                        id="image"
                                        onChange={(e) => setFieldValue('image', e.target.files?.[0])}
                                        accept="image/*"
                                        className="mt-2"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1"/>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <Button type="button" color="gray" onClick={onClose}
                                            disabled={isSubmitting}>Отмена</Button>
                                    <Button
                                        type="submit"
                                        className="text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        disabled={isSubmitting}
                                    >
                                        {user ? 'Сохранить изменения' : 'Создать'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CreateUpdateUserModal;
