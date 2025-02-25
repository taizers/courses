import { FC } from 'react';
import { Formik, Form } from 'formik';
import { loginFields, loginValidationSchema } from '../utils/formFields.ts';
import FormFieldComponent from './FormFieldComponent/FormFieldComponent.tsx';

interface LoginFormProps {
    onSubmit: (values: LoginValues) => void;
    onToggle: () => void;
    isLoading: boolean;
}

interface LoginValues {
    [key: string]: string;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, onToggle, isLoading }) => {
    const initialValues: LoginValues = loginFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as LoginValues);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    {loginFields.map((field) => (
                        <FormFieldComponent key={field.name} field={field} />
                    ))}
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className={`w-full p-2 text-white rounded-lg 
                            ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
                            disabled:opacity-50`}
                    >
                        {isLoading ? 'Загрузка...' : 'Войти'}
                    </button>
                    <button
                        type="button"
                        onClick={onToggle}
                        disabled={isLoading}
                        className={`w-full p-2 text-blue-600 hover:underline ${
                            isLoading ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        Зарегистрироваться
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
