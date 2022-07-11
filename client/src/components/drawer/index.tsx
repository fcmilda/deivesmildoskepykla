import React, { useState } from 'react';
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerScrollLink from './drawer-scroll-link';

const DrawerComp: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemText>
              <DrawerScrollLink smooth offset={-90} to="home">DMK</DrawerScrollLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <DrawerScrollLink smooth offset={-90} to="assortment">Asortimentas</DrawerScrollLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <DrawerScrollLink smooth offset={-90} to="about">Apie</DrawerScrollLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <DrawerScrollLink smooth offset={-90} to="reviews">Atsiliepimai</DrawerScrollLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <DrawerScrollLink smooth offset={-90} to="contacts">Kontaktai</DrawerScrollLink>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton sx={{ height: '100%' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ fontSize: '48px', color: 'white' }} />
      </IconButton>
    </>
  );
};

export default DrawerComp;
