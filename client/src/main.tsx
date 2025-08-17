
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Prevent the error from crashing the app
  event.preventDefault();
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the error from crashing the app
  event.preventDefault();
});

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
