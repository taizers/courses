import { feedBackFields, feedBackValidationSchema } from "../utils/formFields.ts";
import { Form, Formik } from "formik";
import FormFieldComponent from "./FormFieldComponent/FormFieldComponent.tsx";
import { adminApiSlice } from '../store/reducers/AdminApiSlice.ts';
import { useGetQueryResponse } from '../types.ts';
import { ICourseShort } from '../models.ts';
import { useShowErrorToast } from '../hooks.ts';
import { useMemo } from 'react';

interface FormValues {
  [key: string]: string;
}

const FeedBackForm = () => {
  const { data: courses, error: coursesError } = adminApiSlice.useGetAllCoursesShortQuery<useGetQueryResponse<ICourseShort[]>>('');

  const coursesList = useMemo(() => courses?.map((course) => ({value: course.id, label: course.name})) || [], [courses]);

  const fields = [
    ...feedBackFields,
    {
      name: 'program',
      type: 'select',
      label: 'Выбранная программа:',
      placeholder: '',
      options: [
        { value: '', label: 'Выберите программу' },
        ...coursesList,
      ],
    },
  ];

  const initialValues: FormValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as FormValues);

  const [send, { isLoading, error }] = adminApiSlice.useSendFeedbackMutation();

  useShowErrorToast(error);
  useShowErrorToast(coursesError);

  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Оставьте заявку
        </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={feedBackValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            send(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <FormFieldComponent key={field.name} field={field as any} />
              ))}

              <div style={{marginTop: 'auto'}} className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`w-full py-3 px-5 text-sm font-medium text-white rounded-lg transition-colors
                    ${isLoading || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-300 hover:bg-orange-400 focus:ring-4 focus:ring-orange-100'}
                    focus:outline-none`}
                >
                  {isLoading ? "Загрузка..." : "Отправить"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FeedBackForm;
