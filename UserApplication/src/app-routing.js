import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserDetails from './containers/user-details-component';
import NotFound from './components/not-found-component';
import Home from './components/Home';
import NavBar from './components/NavBar';
import About from './components/about';
import Register from './containers/register';


const AppRouting = () => {
    return (
        <BrowserRouter>
        <NavBar/>
            <Switch>
                <Route path="/users/:id" component={UserDetails}/>
                <Route exact path="/users" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouting;