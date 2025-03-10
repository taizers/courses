import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './App.tsx';
import { setupStore } from './store';
import 'flowbite';
import 'flowbite/dist/flowbite.css';
import './index.css';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
