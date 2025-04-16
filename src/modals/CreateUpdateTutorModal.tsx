import {FC} from 'react';
import { Modal, Button } from 'flowbite-react';
import { Formik, Form } from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import {
    tutorEditFields,
    tutorEditValidationSchema,
    tutorFields,
    tutorValidationSchema
} from '../utils/formFields.ts';
import {ITutor} from "../models.ts";

interface TutorCreateUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTutorAction: (values: any) => void;
    tutor?: ITutor;
    isLoading: boolean;
}

const CreateUpdateTutorModal: FC<TutorCreateUpdateModalProps> = ({ isOpen, onClose, onTutorAction, tutor, isLoading }) => {
    const initialValues = tutor
        ? {
            username: tutor.username,
            firstName: tutor.firstName,
            lastName: tutor.lastName,
            email: tutor.email,
            password: tutor.password,
            phone: tutor.phone,
            age: tutor.age,
        }
        : {
            username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              phone: '',
              age: '',
            image: '',
        };

    const onSubmit = (values: any) => {
        if (tutor) {
            onTutorAction({
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                phone: values.phone,
                age: values.age,
            });
        } else {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('phone', values.phone);
            formData.append('age', values.age);
            formData.append('image', values.image || '');

            onTutorAction(formData);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} className="relative">
            <Modal.Header>{tutor ? 'Редактировать преподавателя' : 'Создать преподавателя'}</Modal.Header>
            <Modal.Body className="overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={tutor ? tutorEditValidationSchema : tutorValidationSchema}
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
                                    {(tutor ? tutorEditFields : tutorFields).map((field) => (
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
                                        {tutor ? 'Сохранить изменения' : 'Создать'}
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

export default CreateUpdateTutorModal;