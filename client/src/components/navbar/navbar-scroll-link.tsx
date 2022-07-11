import { Link } from 'react-scroll';
import { styled } from '@mui/material';

const NavbarScrollLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.palette.common.white,
  textDecoration: 'none',
  alignSelf: 'stretch',
  padding: theme.spacing(0, 2),
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '2px',
  fontSize: '1.5em',
  fontFamily: 'Playfair Display SC',

  '&.active': {
    color: theme.palette.bakery.light,
    boxShadow: `inset 0px -3px 0px 0px ${theme.palette.bakery.light}`,
  },

  ':hover': {
    color: theme.palette.bakery.light,
    cursor: 'pointer',
    boxShadow: `inset 0px -3px 0px 0px ${theme.palette.bakery.light}`,
  },

}));

export default NavbarScrollLink;
