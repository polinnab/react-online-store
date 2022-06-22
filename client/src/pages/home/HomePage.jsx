import React from "react";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { NavLink } from "react-router-dom";
import { login_route } from "../../shared/utils/_constans";
import { useTranslation } from "react-i18next";
import Form from "../../components/Form/Form";
import "./homePage.scss";

const HomePage = () => {
    const {isAuth} = useSelector(state => state.login);

    const { t } = useTranslation()

    const formData = {
        formUrl: 'https://staging.anadea.info/api/contacts', //PROCESS  POST
        token: 'some_cool_token',
        formText: {
            title: 'Request a Free Estimation',
            description: 'Get a quote for web design and development, mobile app creation, software testing or another type of IT project.'
        },
        formTheme: '#2F80ED', // '#2F80ED', '#35BBE1', '#B9F3CE'
        formColor: '#FFFFFF', // '#FFFFFF', '#000000'
        buttonName: 'Send',
        minMessageLength: 20
        // TODO: TOKEN HERE  /PROCCESS
    }
    
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

            <div style={{position: 'absolute', top: '100%', width: '90vw', paddingBottom: '35px'}}>
                <Form 
                    options={formData}
                    // formUrl={formData.formUrl}
                    // formText={formData.formText}
                    // formTheme={formData.formTheme}
                    // formColor={formData.formColor}
                    // buttonName={formData.buttonName}
                    // TODO: ONE OBJECT
                    ></Form>
            </div>
        </div>
    )
}

export default HomePage;