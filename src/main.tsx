import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import './styles/index.css';
import './styles/index.scss';
import { store } from "./store";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store} >
                <RouterProvider router={router}/>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
)
