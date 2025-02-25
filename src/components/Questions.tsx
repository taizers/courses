import { FC, useState } from 'react';
import { getMinusIcon, getPlusIcon } from "../utils/Icons.tsx";

const Questions: FC = () => {
    const questions = [
        {
            id: 1,
            title: 'Как проходит обучение?',
            content: 'Обучение проходит в интерактивной форме с использованием онлайн-платформ и практических заданий. Каждый урок включает теорию, практику и домашнее задание.',
        },
        {
            id: 2,
            title: 'Есть ли у вас пробные занятия?',
            content: 'Да, мы предоставляем возможность пройти пробное занятие бесплатно, чтобы вы могли оценить качество нашего обучения.',
        },
        {
            id: 3,
            title: 'Можно ли присоединиться к существующей группе?',
            content: 'Да, вы можете присоединиться к группе, если в ней есть свободные места и ваш уровень соответствует уровню группы.',
        },
        {
            id: 4,
            title: 'На каком конструкторе и в каких программах проходит обучение?',
            content: 'Мы используем популярные онлайн-конструкторы и программы',
        },
    ];

    const [openId, setOpenId] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 mt-8">
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 text-center">
                Часто задаваемые вопросы
            </h3>
            <div id="accordion-flush">
                {questions.map((question) => (
                    <div key={question.id}>
                        <h2 id={`accordion-flush-heading-${question.id}`}>
                            <button
                                type="button"
                                className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                                onClick={() => toggleAccordion(question.id)}
                                aria-expanded={openId === question.id}
                                aria-controls={`accordion-flush-body-${question.id}`}
                            >
                                <span className="text-left">{question.title}</span>
                                <div
                                    className="accordion-icon w-10 h-10 flex items-center justify-center bg-orange-300 border-2 rounded-full text-white text-xl transition-transform"
                                >
                                    {openId === question.id ? getMinusIcon() : getPlusIcon()}
                                </div>
                            </button>
                        </h2>
                        {openId === question.id && (
                            <div
                                id={`accordion-flush-body-${question.id}`}
                                className="py-5 border-b border-gray-200 dark:border-gray-700"
                                aria-labelledby={`accordion-flush-heading-${question.id}`}
                            >
                                <p className="text-gray-500 dark:text-gray-400">{question.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
