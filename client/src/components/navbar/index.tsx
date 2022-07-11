/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  AppBar, Container, IconButton, Toolbar, useMediaQuery, useTheme,
} from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useLocation } from 'react-router-dom';
import { authLogoutAction } from 'store/action-creators';
import { useRootDispatch, useRootSelector } from 'store/hooks';
import { selectAuthLoggedIn } from 'store/selectors';
import DrawerComp from 'components/drawer';
import NavbarScrollLink from './navbar-scroll-link';
import NavbarLink from './navbar-link';

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useRootDispatch();
  const loggedIn = useRootSelector(selectAuthLoggedIn);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'bakery.main', boxShadow: '0', height: '64px',
      }}
    >
      <Container sx={{
        px: {
          xs: 0,
          sm: 0,
        },
      }}
      >

        {
          (location.pathname !== '/')
            ? (
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavbarLink to="/">DMK</NavbarLink>
                {loggedIn
                  && <IconButton onClick={() => dispatch(authLogoutAction)}><MeetingRoomIcon sx={{ color: 'white' }} /></IconButton>}
              </Toolbar>
            )
            : isMobile ? (<DrawerComp />) : (
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <NavbarScrollLink smooth offset={-90} to="home">DMK</NavbarScrollLink>
                <NavbarScrollLink smooth offset={-50} to="assortment">Asortimentas</NavbarScrollLink>
                <NavbarScrollLink smooth offset={-90} to="about">Apie</NavbarScrollLink>
                <NavbarScrollLink smooth offset={-90} to="reviews">Atsiliepimai</NavbarScrollLink>
                <NavbarScrollLink smooth offset={-90} to="contacts">Kontaktai</NavbarScrollLink>
              </Toolbar>
            )
        }
      </Container>
    </AppBar>
  );
};
export default Navbar;
