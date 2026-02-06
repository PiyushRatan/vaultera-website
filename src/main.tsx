import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import scrollProgress from "./components/ScrollProgress.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <>
        {scrollProgress}
        <App />
    </>
);
