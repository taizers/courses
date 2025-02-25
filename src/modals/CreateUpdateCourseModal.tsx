import {FC, MutableRefObject} from 'react';
import { Modal, Button } from 'flowbite-react';
import { Formik, Form } from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import {
    courseEditFields,
    courseEditValidationSchema,
    courseFields,
    courseValidationSchema
} from '../utils/formFields.ts';
import {ICourse} from "../models.ts";

interface CourseCreateUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCourseAction: (values: any) => void;
    course?: ICourse;
    setSubmittingRef: MutableRefObject<(isSubmitting: boolean) => void>;
}

interface IInitialValues {
    name: string;
    description: string;
    start: Date | null;
    end: Date | null;
    image?: string;
}

const CreateUpdateCourseModal: FC<CourseCreateUpdateModalProps> = ({ isOpen, onClose, onCourseAction, course, setSubmittingRef }) => {
    const initialValues = course
        ? {
            name: course.name,
            description: course.description,
            start: course.startDate ? new Date(course.startDate) : null,
            end: course.endDate ? new Date(course.endDate) : null,
        }
        : {
            name: '',
            description: '',
            start: null,
            end: null,
            image: '',
        };

    const onSubmit = (values: IInitialValues) => {
        if (course) {
            onCourseAction({
                name: values.name,
                description: values.description,
                start: values.start ? values.start.toISOString() : '',
                end: values.end ? values.end.toISOString() : '',
            });
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('start', values.start ? values.start.toISOString() : '');
            formData.append('end', values.end ? values.end.toISOString() : '');
            formData.append('image', values.image || '');

            onCourseAction(formData);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} className="relative">
            <Modal.Header>{course ? 'Редактировать курс' : 'Создать курс'}</Modal.Header>
            <Modal.Body className="overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={course ? courseEditValidationSchema : courseValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit, isSubmitting, isValid, dirty, setSubmitting }) => (
                            <Form
                                style={{ maxHeight: '80vh', overflowY: 'auto' }}
                                className={'p-2'}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                    setSubmittingRef.current = setSubmitting;
                                }}
                            >
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                    {(course ? courseEditFields : courseFields).map((field) => (
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
                                        disabled={isSubmitting || !isValid || !dirty}
                                    >
                                        {course ? 'Сохранить изменения' : 'Создать'}
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

export default CreateUpdateCourseModal;