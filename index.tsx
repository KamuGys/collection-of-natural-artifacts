import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Проверяем существование элемента
if (!rootElement) {
    throw new Error("Root element not found");
}

// Создаем корневой узел и рендерим приложение
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
