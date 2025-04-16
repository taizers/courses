import { FC } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormField } from '../../utils/formFields.ts';

interface FormFieldProps {
    field: FormField;
}

const FormFieldComponent: FC<FormFieldProps> = ({ field }) => {
    const { setFieldValue, values } = useFormikContext<any>();

    const renderField = () => {
        switch (field.type) {
            case 'select':
                return (
                    <Field
                        as="select"
                        name={field.name}
                        id={field.name}
                        className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    >
                        <option value="" disabled hidden>
                          {field.placeholder || 'Выберите'}
                        </option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Field>
                );
            case 'date':
                return (
                    <div>
                        <DatePicker
                            selected={values[field.name] ? new Date(values[field.name]) : null}
                            onChange={(date) => {
                                setFieldValue(field.name, date);
                            }}
                            dateFormat="yyyy-MM-dd"
                            className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <ErrorMessage name="start" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                );
            case 'file':
                return (
                    <div>
                        <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFieldValue(field.name, file);
                                }
                            }}
                            accept="image/*"
                            className="mt-2 p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                );
            case 'textarea':
                return (
                    <Field
                        as="textarea"
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        rows={4}
                    />
                );
            default:
                return (
                    <Field
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                );
        }
    };

    return (
        <div className="field-container">
            <label htmlFor={field.name} className="field-label text-gray-700 dark:text-gray-300 font-medium">
                {field.label}
            </label>

            <div className="field-data">
                {renderField()}
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
            </div>
        </div>
    );
};

export default FormFieldComponent;
