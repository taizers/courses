import { FC, useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { authApiSlice } from "../store/reducers/AuthApiSlice.ts";
import { useAppDispatch, useShowErrorToast } from "../hooks.ts";
import { getUserFromToken } from "../utils";
import { setUserData, setUserToken } from "../store/reducers/AuthSlice.ts";
import { setToken } from "../utils/localStorage.ts";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IValues {
    [p: string]: string;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useAppDispatch();

    const toggleForm = () => setIsLogin((prev) => !prev);

    const [register, { data, error, isLoading }] =
        authApiSlice.useSignUpMutation();
    const [login, { data: loginData, error: loginError, isLoading: loginIsLoading }] =
        authApiSlice.useLoginMutation();

    useEffect(() => {
        console.log('register response: ', data);
        if (data !== undefined) {
            toggleForm();
        }
    }, [data]);

    useEffect(() => {
        if (loginData) {
            const localToken = loginData['access-token'];
            const userFromToken = getUserFromToken(localToken);

            dispatch(setUserToken(localToken));
            dispatch(setUserData(userFromToken));
            setToken(localToken);
            onClose();
        }
    }, [loginData]);

    useShowErrorToast(error);
    useShowErrorToast(loginError);

    const onLogin = (values: IValues) => {
        login(values);
    };

    const onRegister = (values: IValues) => {
        register(values);
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="md">
            <Modal.Header>
                {isLogin ? 'Вход' : 'Регистрация'}
            </Modal.Header>
            <Modal.Body>
                {isLogin ? (
                    <LoginForm
                        onSubmit={onLogin}
                        onToggle={toggleForm}
                        isLoading={loginIsLoading}
                    />
                ) : (
                    <RegisterForm
                        onSubmit={onRegister}
                        onToggle={toggleForm}
                        isLoading={isLoading}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
