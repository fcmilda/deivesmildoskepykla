import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const FooterLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  fontWeight: 300,
  fontSize: '1em',
  fontFamily: 'Playfair Display',

  '&.active': {
    color: theme.palette.bakery.light,
    fontWeight: 600,
  },

  ':hover': {
    color: theme.palette.bakery.light,
    cursor: 'pointer',
    fontWeight: 600,
  },

}));

export default FooterLink;
