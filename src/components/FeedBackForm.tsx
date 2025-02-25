import { feedBackFields, feedBackValidationSchema } from "../utils/formFields.ts";
import { Form, Formik } from "formik";
import FormFieldComponent from "./FormFieldComponent/FormFieldComponent.tsx";
import { authApiSlice } from "../store/reducers/AuthApiSlice.ts";

interface FormValues {
    [key: string]: string;
}

const FeedBackForm = () => {
    const initialValues: FormValues = feedBackFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as FormValues);

    const [login, { data: loginData, error: loginError, isLoading }] =
        authApiSlice.useLoginMutation();

    return (
        <div className="max-w-4xl mx-auto space-y-6 mt-8">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 text-center">
                Оставьте заявку на любую из понравившихся вам программ
            </h3>
            <Formik
                initialValues={initialValues}
                validationSchema={feedBackValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    login(values);
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form className="space-y-4 max-w-4xl mx-auto">
                        <div className={'bg-orange-300 p-4 rounded-xl'}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-orange-50 p-2 rounded-xl">
                                {feedBackFields.map((field) => (
                                    <FormFieldComponent key={field.name} field={field}/>
                                ))}
                                <div className="md:col-span-1 col-span-1 flex flex-col mt-auto justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || isLoading}
                                        className={`w-full p-2 text-white rounded-lg 
                                    ${isLoading ? 'bg-gray-400' : 'bg-orange-300 hover:bg-orange-500'}
                                    disabled:opacity-50`}
                                    >
                                        {isLoading ? 'Загрузка...' : 'Отправить'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FeedBackForm;
