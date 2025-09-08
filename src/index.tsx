import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { reduxPersistor, reduxStore } from "./redux-store/store";
import { PersistGate } from "redux-persist/integration/react";
import { registerAnalyticsWidgets, registerPhotoTakerWidget } from "registrer";

// Ejecutamos esta función una vez al iniciar la app
console.log("--- Antes de llamar al registro ---");
registerPhotoTakerWidget();
registerAnalyticsWidgets();
console.log("--- Después de llamar al registro ---");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
