import React from "react";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import { login_route } from "../../shared/utils/_constans";
import { useTranslation } from "react-i18next";
import "./homePage.scss";

const HomePage = () => {
    const {isAuth} = useSelector(state => state.login);

    const { t } = useTranslation()
    
    return(
        <div className="HomePage--container">
            <div className="HomePage--title-block">
                <h1 className="HomePage--title">{t('oneApp')}</h1>
                <p>{t('lorem')}</p>
                {!isAuth && <NavLink to={login_route}><Button variant="contained" size="large" className="HomePage--button">{t('login')}</Button></NavLink>}
            </div>
            <div className="HomePage--images">
                <div className="HomePage--image HomePage--image-first"></div>
                <div className="HomePage--image HomePage--image-second"></div>
            </div>
        </div>
    )
}

export default HomePage;