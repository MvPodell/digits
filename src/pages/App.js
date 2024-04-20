import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";


const AppContext = createContext(null);

const App = () => {
    const [highScore, setHighScore] = useState(0);
    return(
        <AppContext.Provider value={{highScore, setHighScore}}>
            <div className = "App">
                <Outlet />
            </div>
        </AppContext.Provider>
    )
}

export { App, AppContext }