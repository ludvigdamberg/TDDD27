import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './pages/Register';
import  Login  from './pages/Login';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';

const router  =createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/feed',
        element: <Feed/>
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>
   <RouterProvider router={router}/>
</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

