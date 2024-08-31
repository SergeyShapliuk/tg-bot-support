import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {SDKProvider} from "@telegram-apps/sdk-react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <SDKProvider acceptCustomStyles debug>
                <App/>
            </SDKProvider>
        </BrowserRouter>
    </StrictMode>
);
