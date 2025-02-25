import { createSlice } from '@reduxjs/toolkit';

interface IApp {
    menuHeight: number;
}

const initialState: IApp = {
    menuHeight: 0,
};

export const authSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMenuHeight: (state, action) => {
            state.menuHeight = action.payload;
        },
    },
});

export const { setMenuHeight } = authSlice.actions;

export default authSlice.reducer;