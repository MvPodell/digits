import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { Home } from "./Home";


const AppContext = createContext(null);

const App = () => {
    const [highScore, setHighScore] = useState(0);
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleStartClick = () => {
        setStarted(true);
        navigate("/digits");
        console.log("started! ", started);
    };

    const handleLoginClick = () => {
        setStarted(true);
        navigate("/login");
        console.log("login! ", started);
    }

    useEffect(() => {
        // Reset started state when navigating back to /home
        if (location.pathname === "/home") {
            setStarted(false);
        }
    }, [location.pathname]);

    return(
        <AppContext.Provider value={{highScore, setHighScore, started}}>
            <div className = "App">
                {started ? <Outlet /> : <Home started={started} onStart={handleStartClick} onLogin={handleLoginClick} /> }
            </div>
        </AppContext.Provider>
    )
}

export { App, AppContext }