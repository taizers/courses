import {FC} from 'react';
import { Modal, Button } from 'flowbite-react';
import { Formik, Form } from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import { profileFields, profileValidationSchema } from '../utils/formFields.ts';
import {IUser} from "../models.ts";

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateAction: (values: any) => void;
    profile: IUser;
    isLoading: boolean;
}

const UpdateProfileModal: FC<UpdateProfileModalProps> = ({ isOpen, onClose, onUpdateAction, profile, isLoading }) => {
    const initialValues = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
            age: profile.age,
            image: '',
        };

    const onSubmit = (values: any) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phone', values.phone);
      formData.append('age', values.age);
      formData.append('image', values.image || '');

      onUpdateAction(formData);
    };

    return (
        <Modal show={isOpen} onClose={onClose} className="relative">
            <Modal.Header>{'Редактировать профиль'}</Modal.Header>
            <Modal.Body className="overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={profileValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit, isValid, dirty }) => (
                            <Form
                                style={{ maxHeight: '80vh', overflowY: 'auto' }}
                                className={'p-2'}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                    {profileFields.map((field) => (
                                        <FormFieldComponent
                                            key={field.name}
                                            field={field as never}
                                        />
                                    ))}
                                </div>


                                <div className="mt-4 flex justify-end space-x-2">
                                    <Button
                                        type="button"
                                        color="gray"
                                        onClick={onClose}
                                    >
                                        Отмена
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        disabled={isLoading || !isValid || !dirty}
                                    >
                                        {'Сохранить изменения'}
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

export default UpdateProfileModal;