import { FC, useRef, useEffect, useState, SetStateAction} from 'react';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Card {
    id: number;
    image: string;
    name?: string;
    degree?: string;
}

interface ThisProps {
    cards: Card[];
    title?: string;
    autoplay?: boolean;
    indicators?: boolean;
    buttons?: boolean;
}

const Carousel: FC<ThisProps> = ({cards, title = '', autoplay = true, indicators = true, buttons = true}) => {
    const swiperRef = useRef<SwiperRef>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (autoplay) {
            swiperRef.current?.swiper?.autoplay?.start();
        }
    }, [autoplay]);

    const handleIndicatorClick = (index: number) => {
        swiperRef.current?.swiper?.slideTo(index);
    };

    const handleSlideChange = (swiper: { realIndex: SetStateAction<number> }) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <div className={'p-2'}>
            {title && <p className="mt-8 text-lg font-medium text-gray-800 dark:text-gray-200">{title}</p>}

            <div className="relative w-full mt-4">
                <Swiper
                    ref={swiperRef}
                    spaceBetween={20}
                    slidesPerView={3}
                    autoplay={autoplay ? {
                        delay: 3000,
                        disableOnInteraction: false,
                    } : false}
                    loop={true}
                    breakpoints={{
                        10: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    onSlideChange={handleSlideChange}
                    className="w-full p-4"
                >
                    {cards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div
                                className="flex flex-col items-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 lg:w-1/3 w-full"
                            >
                                <div
                                    className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-700 mb-4">
                                    <img
                                        src={card.image}
                                        alt={`Фото преподавателя ${card.name}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
                                    {card.name}
                                </h3>
                                <p className="text-lg text-gray-700 dark:text-gray-400 mt-2">
                                    {card.degree}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {indicators && (
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                        {cards.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                aria-current={index === activeIndex ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                                onClick={() => handleIndicatorClick(index)}
                            ></button>
                        ))}
                    </div>
                )}

                {buttons && (
                    <>
                        <button
                            type="button"
                            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            onClick={() => swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.slidePrev()}
                        >
                          <span className="inline-flex bg-gray-100 items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 text-white group-hover:bg-gray-900/80">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                          </span>
                        </button>

                        <button
                            type="button"
                            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            onClick={() => swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.slideNext()}
                        >
                          <span className="inline-flex bg-gray-100 items-center justify-center w-10 h-10 rounded-full bg-gray-800/60 text-white group-hover:bg-gray-900/80">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                          </span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carousel;
