import { FC } from 'react';
import { Formik, Form } from 'formik';
import { registerFields, registerValidationSchema } from '../utils/formFields.ts';
import FormFieldComponent from './FormFieldComponent/FormFieldComponent.tsx';

interface RegisterFormProps {
    onSubmit: (values: RegisterValues) => void;
    onToggle: () => void;
    isLoading: boolean;
}

interface RegisterValues {
    [key: string]: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, onToggle, isLoading }) => {
    const initialValues: RegisterValues = registerFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as RegisterValues);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{maxHeight: '80vh', overflowY: 'auto'}} className="space-y-4 p-2">
                    {registerFields.map((field) => (
                        <FormFieldComponent key={field.name} field={field} />
                    ))}
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className={`w-full p-2 text-white rounded-lg 
                            ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
                            disabled:opacity-50`}
                    >
                        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                    <button
                        type="button"
                        onClick={onToggle}
                        disabled={isLoading}
                        className={`w-full p-2 text-blue-600 hover:underline ${
                            isLoading ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        Войти
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
