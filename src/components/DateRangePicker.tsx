import React, { useEffect, useRef } from 'react';
import { FieldProps } from 'formik';

interface DateRangePickerProps extends FieldProps {
    startId: string;
    endId: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
                                                             field,
                                                             form,
                                                             startId,
                                                             endId,
                                                         }) => {
    const startRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initDateRangePicker = async () => {
            const { Datepicker } = await import('flowbite-datepicker');
            if (startRef.current && endRef.current) {
                new Datepicker(startRef.current);
                new Datepicker(endRef.current);
            }
        };
        initDateRangePicker();
    }, []);

    return (
        <div id="date-range-picker" className="flex items-center">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    id={startId}
                    ref={startRef}
                    type="text"
                    placeholder="Выберите дату начала"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                        form.setFieldValue(field.name, { ...field.value, start: e.target.value })
                    }
                />
            </div>
            <span className="mx-4 text-gray-500">по</span>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                <input
                    id={endId}
                    ref={endRef}
                    type="text"
                    placeholder="Выберите дату окончания"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                        form.setFieldValue(field.name, { ...field.value, end: e.target.value })
                    }
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
