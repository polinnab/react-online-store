import React, { useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { main_route, admin_route, login_route, user_route, shop_route, cart_route, products_route, three_route } from '../../shared/utils/_constans';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/images/icons/logo.svg';
import { loginActions } from '../../redux-store/saga/sagaActions';
import { useTranslation } from "react-i18next";

import './header.scss';

const lngs = {
  en: {nativeName: 'En'},
  ua: {nativeName: 'Ukr'}
}

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.login);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { t, i18n } = useTranslation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogoutClick = () => {
    const payload = {user};
    dispatch({type: loginActions.LOGOUT, payload})
    handleCloseUserMenu();
  }

  return (
    <AppBar color='default' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters className='header__container'>
          <Typography noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to={main_route} className='header__logo'>
              <img src={logo} alt='logo' />
            </NavLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              <MenuItem onClick={handleCloseNavMenu} className='header__link'>
                <NavLink to={main_route}>{t('home')}</NavLink>
              </MenuItem>
              {isAuth &&
              <MenuItem onClick={handleCloseNavMenu} className='header__link'>
                <NavLink to={products_route}>{t('products')}</NavLink>
              </MenuItem>}
              <MenuItem onClick={handleCloseNavMenu} className='header__link'>
                <NavLink to={three_route}>Three JS</NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img src={logo} alt='logo' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu} className='header__link'>
              <NavLink to={main_route}>{t('home')}</NavLink>
            </MenuItem>
            {isAuth &&
            <MenuItem onClick={handleCloseNavMenu} className='header__link'>
              <NavLink to={products_route}>{t('products')}</NavLink>
            </MenuItem>}
            <MenuItem onClick={handleCloseNavMenu} className='header__link'>
                <NavLink to={three_route}>Three JS</NavLink>
              </MenuItem>
          </Box>

          {Object.keys(lngs).map((lng) => (
            <button 
              className='language-button'
              type='submit' 
              key={lng} 
              onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>
                {lngs[lng].nativeName}
              </button>
          ))}

          {isAuth && <Box sx={{ flexGrow: 0, marginRight: '10px' }}>
              <NavLink to={cart_route}>
                <ShoppingCartIcon className='header__cart-icon'/>
              </NavLink>
          </Box>}

          <Box sx={{ flexGrow: 0 }}>
            {isAuth && (
              <React.Fragment>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>

                  {user.admin ? (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to={admin_route}>
                        <Typography textAlign='center'>{t('admin')}</Typography>
                      </NavLink>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to={!user.admin ? user_route : shop_route}>
                        <Typography textAlign='center'>{t('account')}</Typography>
                      </NavLink>
                    </MenuItem>
                  )}

                  <MenuItem onClick={onLogoutClick}>
                    <NavLink to={main_route}>
                    <Typography textAlign='center'>{t('logout')}</Typography>
                    </NavLink>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )} 
            {!isAuth && (
              <NavLink to={login_route}>
                <Button color='inherit'>{t('login')}</Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
