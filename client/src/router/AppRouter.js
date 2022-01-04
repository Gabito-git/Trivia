
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import GameScreen from "../screens/GameScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route exact path="/welcome" component={ WelcomeScreen }/>
                    <Route exact path="/" component = { GameScreen } />

                    <Redirect to="/welcome" />

                </Switch>
            </div>
            
        </Router>
    )
}

export default AppRouter
