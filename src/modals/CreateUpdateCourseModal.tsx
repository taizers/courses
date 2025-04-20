import { FC, useMemo } from 'react';
import { Modal, Button } from 'flowbite-react';
import { Formik, Form } from 'formik';
import FormFieldComponent from '../components/FormFieldComponent/FormFieldComponent.tsx';
import {
    courseEditFields,
    courseEditValidationSchema,
    courseFields,
    courseValidationSchema
} from '../utils/formFields.ts';
import { ICourse, ITutorShort } from '../models.ts';

interface CourseCreateUpdateModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onCourseAction: (values: any) => void;
    course?: ICourse;
    tutors?: ITutorShort[];
}

interface IInitialValues {
    name: string;
    description: string;
    start: Date | null;
    end: Date | null;
    image?: string;
    tutorUsername: string;
}

const CreateUpdateCourseModal: FC<CourseCreateUpdateModalProps> = ({ isOpen, onClose, onCourseAction, course, isLoading, tutors }) => {
    const initialValues = course
        ? {
            name: course.name,
            description: course.description,
            start: course.startDate ? new Date(course.startDate) : null,
            end: course.endDate ? new Date(course.endDate) : null,
            tutorUsername: course.tutorUsername,
        }
        : {
            name: '',
            description: '',
            start: null,
            end: null,
            image: '',
            tutorUsername: '',
        };

    const onSubmit = (values: IInitialValues) => {
        if (course) {
            onCourseAction({
                name: values.name,
                description: values.description,
                tutorUsername: values.tutorUsername,
                start: values.start ? values.start.toISOString() : '',
                end: values.end ? values.end.toISOString() : '',
            });
        } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('tutorUsername', values.tutorUsername);
            formData.append('start', values.start ? values.start.toISOString() : '');
            formData.append('end', values.end ? values.end.toISOString() : '');
            formData.append('image', values.image || '');

            onCourseAction(formData);
        }
    };

    const tutorsOptions = useMemo(() => {
        if (!tutors?.length) return [];

        return tutors.map(item =>
          ({value: item.username, label: `${item.lastName} ${item.firstName}`}));
    }, [tutors])

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
                                    {(course ? courseEditFields : courseFields).map((field) => (
                                        <FormFieldComponent
                                            key={field.name}
                                            field={field as never}
                                        />
                                    ))}
                                    <FormFieldComponent
                                      key={'tutorUsername'}
                                      field={{
                                          type: 'select',
                                          name: 'tutorUsername',
                                          label: 'Преподаватель',
                                          placeholder: 'Выберите преподавателя',
                                          options: tutorsOptions,
                                      }}
                                    />
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