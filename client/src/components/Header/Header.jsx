import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { main_route, admin_route, auth_route, user_route, shop_route, userCart_route } from '../../shared/utils/_constans';
import './header.scss';
import logo from '../../assets/images/icons/logo.svg';
import useAuth from '../../shared/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux-store/saga/sagaActions';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, role, email, id } = useAuth();
  const user = useSelector(state => state.user.user)
  const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
  
   console.log('user', user);

  useEffect(() => {
    const user = {
      id,
      email,
      role,
      isAuth
    }
    dispatch({type: userActions.SET_USER, user })
  }, [isAuth, user.isAuth]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu =  () => {
    setAnchorElUser(null);
    dispatch({type: userActions.LOGOUT})
  };
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
                <NavLink to={main_route}>Products</NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img src={logo} alt='logo' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={handleCloseNavMenu} className='header__link'>
              <NavLink to={main_route}>Products</NavLink>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0, marginRight: '10px' }}>
            {isAuth ? (
              <NavLink to={userCart_route}>
                <ShoppingCartIcon className='header__cart-icon' />
              </NavLink>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuth ? (
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
                  {role === 'Admin' ? (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to={admin_route}>
                        <Typography textAlign='center'>Admin</Typography>
                      </NavLink>
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to={role === 'User' ? user_route : shop_route}>
                        <Typography textAlign='center'>Account</Typography>
                      </NavLink>
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <NavLink to={auth_route}>
                <Button color='inherit'>Login</Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
