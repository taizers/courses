import { clearToken } from './localStorage.ts';
import { createToast } from './toasts';

export const getUserFromToken = (token?: string | null) => {
  if (!token) {
    return {};
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentDate = Math.floor(new Date().getTime() / 1000);

    if (currentDate < payload.exp) {
      return {
        username: payload.username,
        role: payload.role || 'ADMIN',
      };
    }

    clearToken();
    return {};
  } catch (err) {
    if (err) {
      createToast.error('Invalid Token');

      clearToken();
      return {};
    }
  }
};
