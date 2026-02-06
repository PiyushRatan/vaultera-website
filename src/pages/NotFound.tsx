import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/styles/notFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-message">Oops! Page not found</p>
        <a href="/" className="not-found-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
