
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { GameContext } from "../context/gameContext";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import GameScreen from "../screens/GameScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const AppRouter = () => {
    const {state} = useContext( GameContext );
    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        exact
                        path="/welcome"
                        component={ WelcomeScreen }
                        isAuthenticated={!!state.nickname}
                    />

                    <PrivateRoute
                        exact
                        path ='/'
                        isAuthenticated={!!state.nickname}
                        component={ GameScreen }
                    />

                    <Redirect to="/welcome" />

                </Switch>
            </div>
            
        </Router>
    )
}

export default AppRouter
