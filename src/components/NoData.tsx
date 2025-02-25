import React from 'react';

const NoData: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8 shadow-lg rounded-lg bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-700">Нет данных</h2>
                <p className="text-gray-500 mt-2">Пожалуйста, попробуйте позже.</p>
            </div>
        </div>
    );
};

export default NoData;
