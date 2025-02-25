import * as Yup from 'yup';

export interface FormField {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    options?: {
        value: string;
        label: string;
    }[]
}

export const registerFields: FormField[] = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Введите имя пользователя',
        label: 'Имя пользователя',
    },
    {
        name: 'firstName',
        type: 'text',
        placeholder: 'Введите имя',
        label: 'Имя',
    },
    {
        name: 'lastName',
        type: 'text',
        placeholder: 'Введите фамилию',
        label: 'Фамилия',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Введите email',
        label: 'Email',
    },
    {
        name: 'phone',
        type: 'text',
        placeholder: 'Введите номер телефона',
        label: 'Телефон',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Введите пароль',
        label: 'Пароль',
    },
    {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Повторите пароль',
        label: 'Подтверждение пароля',
    },
    {
        name: 'age',
        type: 'number',
        placeholder: 'Введите возраст',
        label: 'Возраст',
    },
];

export const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Обязательное поле'),
    firstName: Yup.string()
        .required('Обязательное поле'),
    lastName: Yup.string()
        .required('Обязательное поле'),
    email: Yup.string()
        .email('Некорректный email')
        .required('Обязательное поле'),
    phone: Yup.string()
        .matches(
            /^\+?\d{1,4}?\s?\(?\d{1,5}?\)?\s?\d{1,4}?\s?\d{1,4}?\s?\d{1,9}$/,
            'Некорректный номер телефона'
        )
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Обязательное поле'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Обязательное поле'),
    age: Yup.number()
        .min(18, 'Возраст должен быть 18 лет или больше')
        .required('Обязательное поле'),
});


export const loginFields: FormField[] = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Введите имя пользователя',
        label: 'Имя пользователя',
    },
    {
        name: 'password',
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите ваш пароль',
    },
];

export const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимум 6 символов')
        .required('Поле обязательно для заполнения'),
});

export const feedBackFields: FormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Ваше имя:',
        placeholder: 'Введите ваше имя',
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Ваш номер телефона:',
        placeholder: 'Введите номер телефона',
    },
    {
        name: 'reason',
        type: 'select',
        label: 'Выбранная программа:',
        placeholder: '',
        options: [
            { value: '', label: 'Выберите программу' },
            { value: 'prog1', label: 'Программа 1' },
            { value: 'prog2', label: 'Программа 2' },
            { value: 'prog3', label: 'Программа 3' },
        ],
    },
];

export const feedBackValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Имя обязательно для заполнения')
        .min(2, 'Имя должно содержать не менее 2 символов')
        .max(50, 'Имя не может быть длиннее 50 символов'),
    phone: Yup.string()
        .required('Телефон обязателен для заполнения')
        .matches(
            /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
            'Введите корректный номер телефона'
        ),
    reason: Yup.string()
        .required('Выберите причину обращения'),
});

export const courseValidationSchema = Yup.object({
    name: Yup.string().required('Название курса обязательно'),
    description: Yup.string().required('Описание курса обязательно'),
    start: Yup.date()
        .typeError('Дата начала должна быть в формате YYYY-MM-DD')
        .required('Дата начала обязательна'),
    end: Yup.date()
        .typeError('Дата окончания должна быть в формате YYYY-MM-DD')
        .min(Yup.ref('start'), 'Дата окончания должна быть позже даты начала')
        .required('Дата окончания обязательна'),
    image: Yup.mixed()
        .required('Изображение обязательно')
        .test('fileFormat', 'Поддерживаются только изображения форматов .jpg, .jpeg, .png',
            (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes((value as File).type);
            })
});

export const courseEditValidationSchema = Yup.object({
    name: Yup.string().required('Название курса обязательно'),
    description: Yup.string().required('Описание курса обязательно'),
    start: Yup.date()
        .typeError('Дата начала должна быть в формате YYYY-MM-DD')
        .required('Дата начала обязательна'),
    end: Yup.date()
        .typeError('Дата окончания должна быть в формате YYYY-MM-DD')
        .min(Yup.ref('start'), 'Дата окончания должна быть позже даты начала')
        .required('Дата окончания обязательна'),
});

export const courseFields = [
    { name: 'name', label: 'Название курса', placeholder: 'Введите название курса', type: 'text' },
    { name: 'description', label: 'Описание курса', placeholder: 'Введите описание курса', type: 'textarea' },
    { name: 'start', label: 'Дата начала', type: 'date' },
    { name: 'end', label: 'Дата окончания', type: 'date' },
    { name: 'image', label: 'Изображение', type: 'file' },
];

export const courseEditFields = [
    { name: 'name', label: 'Название курса', placeholder: 'Введите название курса', type: 'text' },
    { name: 'description', label: 'Описание курса', placeholder: 'Введите описание курса', type: 'textarea' },
    { name: 'start', label: 'Дата начала', type: 'date' },
    { name: 'end', label: 'Дата окончания', type: 'date' },
];

export const eventValidationSchema = Yup.object({
    name: Yup.string().required('Название события обязательно'),
    description: Yup.string().required('Описание события обязательно'),
    dateOfEvent: Yup.date()
        .typeError('Дата события должна быть в формате YYYY-MM-DD')
        .required('Дата события обязательна'),
    image: Yup.mixed()
        .required('Изображение обязательно')
        .test('fileFormat', 'Поддерживаются только изображения форматов .jpg, .jpeg, .png',
            (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes((value as File).type);
            })
});

export const eventEditValidationSchema = Yup.object({
    name: Yup.string().required('Название события обязательно'),
    description: Yup.string().required('Описание события обязательно'),
    dateOfEvent: Yup.date()
        .typeError('Дата события должна быть в формате YYYY-MM-DD')
        .required('Дата события обязательна'),
});

export const eventFields = [
    { name: 'name', label: 'Название события', placeholder: 'Введите название события', type: 'text' },
    { name: 'description', label: 'Описание события', placeholder: 'Введите описание события', type: 'textarea' },
    { name: 'dateOfEvent', label: 'Дата события', type: 'date' },
    { name: 'image', label: 'Изображение', type: 'file' },
];

export const eventEditFields = [
    { name: 'name', label: 'Название события', placeholder: 'Введите название события', type: 'text' },
    { name: 'description', label: 'Описание события', placeholder: 'Введите описание события', type: 'textarea' },
    { name: 'dateOfEvent', label: 'Дата события', type: 'date' },
];

export const userValidationSchema = Yup.object({
    username: Yup.string().required('Имя пользователя обязательно'),
    firstName: Yup.string().required('Имя обязательно'),
    lastName: Yup.string().required('Фамилия обязательна'),
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен'),
    email: Yup.string().email('Неверный формат электронной почты').required('Электронная почта обязательна'),
    phone: Yup.string()
        .matches(/^\+?\d{1,4}?\s?\(?\d{1,5}?\)?\s?\d{1,4}?\s?\d{1,4}?\s?\d{1,9}$/, 'Неверный формат номера телефона')
        .required('Телефон обязателен'),
    image: Yup.mixed()
        .required('Изображение обязательно')
        .test('fileFormat', 'Поддерживаются только изображения форматов .jpg, .jpeg, .png',
            (value) => {
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes((value as File).type);
            })
});

export const userFields = [
    { name: 'username', label: 'Имя пользователя', placeholder: 'Введите имя пользователя', type: 'text' },
    { name: 'firstName', label: 'Имя', placeholder: 'Введите имя', type: 'text' },
    { name: 'lastName', label: 'Фамилия', placeholder: 'Введите фамилию', type: 'text' },
    { name: 'password', label: 'Пароль', placeholder: 'Введите пароль', type: 'password' },
    { name: 'email', label: 'Электронная почта', placeholder: 'Введите электронную почту', type: 'email' },
    { name: 'phone', label: 'Телефон', placeholder: 'Введите телефон', type: 'text' }
];