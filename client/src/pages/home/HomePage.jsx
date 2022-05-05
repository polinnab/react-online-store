import React from "react";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import { login_route } from "../../shared/utils/_constans";
import "./homePage.scss";

const HomePage = () => {
    const {isAuth} = useSelector(state => state.login);
    
    return(
        <div className="HomePage--container">
            <div className="HomePage--title-block">
                <h1 className="HomePage--title">One app for all shoes.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                {!isAuth && <NavLink to={login_route}><Button variant="contained" size="large" className="HomePage--button">Log in</Button></NavLink>}
            </div>
            <div className="HomePage--images">
                <div className="HomePage--image HomePage--image-first"></div>
                <div className="HomePage--image HomePage--image-second"></div>
            </div>
        </div>
    )
}

export default HomePage;