import React, {Component} from "react";
import ReactDOM from 'react-dom';
import "./assets/css/main.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import Logo from './assets/img/broken-nike-logo.jpg'

export default class App extends Component {
    render() {
        let navLink = (
            <div className="Tab">
                <NavLink exact to="/sign-in" activeClassName="activeLink" className="sign-in">
                    Sign In
                </NavLink>
                <NavLink to="/sign-up" activeClassName="activeLink" className="sign-up">
                    Sign Up
                </NavLink>
            </div>
        );

        const login = localStorage.getItem("isLoggedIn");

        return (
            <div className="container-app">
                <div className="App">
                    <img className="img-logo" src={Logo} alt='...' />
                    {login ? (
                        <BrowserRouter>
                            <Route path="/sign-up" component={Register}/>
                            <Route exact path="/sign-in" component={Login}/>
                            <Route path="/welcome" component={Home}/>
                        </BrowserRouter>
                    ) : (
                        <BrowserRouter>
                            {navLink}
                            <Route path="/sign-up" component={Register}/>
                            <Route exact path="/sign-in" component={Login}/>
                            <Route path="/welcome" component={Home}/>
                        </BrowserRouter>
                    )}
                </div>

            </div>
        );
    }
}
ReactDOM.render(<App/>, document.getElementById('authentication'))
