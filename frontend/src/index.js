import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import MenuPage from './pages/MenuPage';
import HomePage from './pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const router = createBrowserRouter(
//   [
//    {
//     path: '/',
//     element: <App />
//    },
//    {
//     path: '/menu-detail/:id',
//     element: <MenuPage />
//    }
//   ]
// )

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/menu-detail/:id' element={<MenuPage />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
