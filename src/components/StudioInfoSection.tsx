const StudioInfoSection = () => {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        Аренда фотостудии для проведения мероприятий
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Наша фотостудия предоставляет в аренду стильное и оборудованное пространство для организации различных событий. Идеальное решение для:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>Корпоративных встреч</li>
        <li>Торжественных мероприятий</li>
        <li>Творческих проектов</li>
        <li>Семейных праздников</li>
        <li>Персональных фотосессий</li>
        <li>Детских праздников с образовательным компонентом</li>
      </ul>

      <div>
        <h2 className="text-xl font-semibold mb-2">Ключевые преимущества:</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Вместимость до 20 человек</li>
          <li>Возможность аренды с профессиональным фотографом или без</li>
          <li>Современное осветительное оборудование и нейтральные интерьеры для качественных снимков</li>
          <li>Гибкие тарифы с почасовой или посуточной оплатой</li>
          <li>Удобная транспортная доступность и парковка</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Особые условия для детских мероприятий:</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Каждое детское мероприятие включает обязательный 60-минутный мастер-класс по робототехнике, проводимый сертифицированными специалистами.
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Основы конструирования и программирования</li>
          <li>Работа с образовательными наборами LEGO Education</li>
          <li>Интерактивные форматы обучения</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Условия аренды:</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Помещение площадью 55 кв.м оборудовано всем необходимым для комфортного проведения мероприятий. Доступны дополнительные услуги:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Фотосопровождение</li>
          <li>Профессиональный визажист</li>
          <li>Оформление пространства</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mt-2">Минимальный срок аренды — 3 часа.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Стоимость аренды фотостудии</h2>
        <p className="text-gray-700 dark:text-gray-300 font-semibold">1. Аренда фотостудии</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>1 час — 45 руб.</li>
          <li>3 часа — 120 руб (экономия 15 руб./час)</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 font-semibold mt-2">2. Фотосъемка с профессиональным фотографом</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>30 минут — от 80 руб.</li>
          <li>1 час — от 120 руб.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 font-semibold mt-2">Пакет "Умный праздник" (3 часа) — от 250 руб.</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Аренда студии на 3 часа</li>
          <li>1 час мастер-класса по робототехнике</li>
          <li>Пространство для развлекательной программы</li>
          <li>Тематически оформленная фотозона</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 font-semibold mt-2">Дополнительные услуги:</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Услуги фотографа (1 час) — +80 руб.</li>
          <li>Видеосъемка мероприятия — +100 руб.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Галерея фотостудии</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="/studio-1.png"
            alt="Фото студии"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
          <img
            src="/studio-2.png"
            alt="Фото студии"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
          <img
            src="/studio-3.png"
            alt="Фото студии"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
          <img
            src="/studio-4.png"
            alt="Фото студии"
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default StudioInfoSection;
