import {FC} from 'react';
import { Modal, Button } from 'flowbite-react';
import { Formik, Form } from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import {eventEditFields, eventEditValidationSchema, eventFields, eventValidationSchema} from '../utils/formFields.ts';
import {IEvent} from "../models.ts";

interface EventCreateUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEventAction: (values: any) => void;
    event: IEvent | null;
    isLoading: boolean;
}

interface IInitialValues {
    name: string;
    description: string;
    dateOfEvent: Date | null;
    image?: string;
}

const CreateUpdateEventModal: FC<EventCreateUpdateModalProps> = ({ isOpen, onClose, onEventAction, event, isLoading }) => {
    const initialValues = event
        ? {
            name: event.name,
            description: event.description,
            dateOfEvent: event.dateOfEvent,
        }
        : {
            name: '',
            description: '',
            dateOfEvent: null,
            image: '',
        };

    const onSubmit = (values: IInitialValues) => {
        if (event) {
            onEventAction({
                name: values.name,
                description: values.description,
                dateOfEvent: values.dateOfEvent,
            });
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('dateOfEvent', values.dateOfEvent ? values.dateOfEvent.toISOString() : '');
            formData.append('image', values.image || '');
            onEventAction(formData);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} className="relative">
            <Modal.Header>{event ? 'Редактировать событие' : 'Создать событие'}</Modal.Header>
            <Modal.Body className="overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                    <Formik
                        initialValues={initialValues as never}
                        validationSchema={event ? eventEditValidationSchema : eventValidationSchema}
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
                                    {(event ? eventEditFields : eventFields).map((field) => (
                                        <FormFieldComponent
                                            key={field.name}
                                            field={field as never}
                                        />
                                    ))}
                                </div>

                                <div>
                                    {isValid}
                                    {dirty}
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
                                        {event ? 'Сохранить изменения' : 'Создать'}
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

export default CreateUpdateEventModal;