import { Button } from "flowbite-react";
import { getArrowRightIcon, getLongRightArrow, getPlayIcon } from "../utils/Icons.tsx";
import { useNavigate } from "react-router-dom";

const Info = () => {
    const history = useNavigate();

    const onVideoClick = () => history("video");
    const onProgramsClick = () => history("courses");
    const onNextClick = () => history("next");

    const renderImageBlock = (i: number) => (
        <div key={i} className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-200">
            <img
                src="https://via.placeholder.com/150"
                alt={`Фото ${i + 1}`}
                className="w-full h-full object-cover"
            />
        </div>
    );

    return (
        <div className="bg-white py-16 px-6 sm:px-12">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Левый блок */}
                <div className="md:text-left space-y-4 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                            Инновационные технологии и разработка роботов
                        </h1>
                        <p className="max-w-xs text-sm text-gray-500">
                            Курсы по робототехнике в Гродно для детей дошкольного возраста, 1-5 классов и средней школы.
                        </p>
                        <div className="space-x-4 mt-6 flex">
                            <Button onClick={onProgramsClick}
                                    className="bg-orange-300 rounded-xl text-left flex items-center" color="gray">
                                <span>Наши программы</span>
                                <span>{getArrowRightIcon()}</span>
                            </Button>
                            <Button onClick={onVideoClick} className="border-2" color="gray">
                                <span>Смотреть видео</span>
                                <span>{getPlayIcon()}</span>
                            </Button>
                        </div>
                    </div>


                    <div className="flex flex-wrap justify-between gap-3">
                        <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
                            {Array(3).fill("").map((_, i) => renderImageBlock(i))}
                        </div>
                        <div>
                            <div onClick={onNextClick}
                                 className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-200 relative cursor-pointer m-2">
                                <img src="https://via.placeholder.com/150" alt="Фото"
                                     className="w-full h-full object-cover"/>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    {getLongRightArrow()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between gap-3">
                        <div className="rounded-xl bg-gray-100 flex flex-col p-4">
                            <p className="text-5xl">+150</p>
                            <p>Успешных учеников нашей школы</p>
                        </div>
                        <div className="rounded-xl bg-gray-100 flex p-4 items-center gap-4">
                            <p>Множество филиалов и разнообразные программы для каждого возраста</p>
                            <div className="w-32 h-20 overflow-hidden rounded-xl border-4">
                                <img src="https://via.placeholder.com/150" alt="Фото" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правый блок */}
                <div className="space-y-6 flex flex-col justify-center">
                    {/* Первый блок */}
                    <div style={{ height: "400px" }} className="bg-orange-300 rounded-lg shadow-lg relative">
                        <div
                            className="absolute left-5 bottom-4 flex flex-col items-center text-center bg-orange-100 p-4 rounded-full shadow-lg"
                            style={{ maxWidth: "160px" }}
                        >
                            <p className="font-bold text-sm">Читай</p>
                            <p className="font-bold text-sm mb-2">больше о нас</p>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-300 shadow-md text-black text-xl">
                                ↓
                            </div>
                        </div>
                    </div>

                    {/* Второй и третий блоки */}
                    <div className="grid grid-cols-2 gap-4 w-full h-[200px]">
                        {Array(2).fill("").map((_, i) => (
                            <div key={i} className="relative rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Фото"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="bg-orange-100 p-4 rounded-lg shadow-lg text-center w-full absolute bottom-0">
                                    <p className="mt-2 text-sm font-medium text-ellipsis overflow-hidden">
                                        Давайте поговорим!
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
