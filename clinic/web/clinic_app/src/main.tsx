import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import {store} from "./store/store.ts";



  
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <StrictMode>
          <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);
