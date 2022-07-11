import React from 'react';
import {
  Typography, Container, Box, styled, Button,
} from '@mui/material';
import AboutPage from 'pages/about-page';
import ReviewsPage from 'pages/review-page';
import AssortmentPage from 'pages/assortment-page';
import ContactsPage from 'pages/contacts-page';
import { Link } from 'react-scroll';
import SectionTitle from 'components/sectiontitle';

const loremipsum = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quidem expedita, reiciendis officiis aut dolorum temporibus magnam facere voluptates veniam amet quos vero velit? Corporis culpa ad magnam excepturi earum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus esse autem itaque laborum, magnam nulla atque reprehenderit error eligendi corrupti. Laboriosam, exercitationem. Quasi sapiente error omnis nihil alias, inventore modi.';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.bakery.light,
  backgroundColor: theme.palette.bakery.main,
  padding: theme.spacing(0, 2),
  height: '36px',

  ':hover': {
    backgroundColor: theme.palette.bakery.dark,
  },

}));

const styles = {
  container: {
    backgroundImage: 'url(\'assets/keksiukai2.png\')',
    backgroundRepeat: 'no-repeat',
  },
};

const HomePage: React.FC = () => (
  <>
    <Container style={styles.container} id="home" sx={{ mb: 5, height: '100%' }}>
      <SectionTitle title="Kepyklos puslapis" description="Kepykla įsikūrusi 2023 m. Vilniuje" />
      <Box sx={{ display: 'flex' }}>
        <Box component="section" sx={(theme) => theme.mixins.section}>
          <Typography
            component="p"
            sx={{
              color: 'bakery.dark',
              backgroundColor: { xs: 'rgba(255, 245, 245, 0.4)', lg: 'rgba(255, 245, 245, 0)' },
              p: 2,
            }}
          >
            {loremipsum}
          </Typography>
          <StyledButton size="large" variant="outlined" sx={{ mt: '50px' }}>
            <Link smooth to="assortment" offset={-60}>Išsirink savo kepinį</Link>
          </StyledButton>
        </Box>
      </Box>
    </Container>
    <AssortmentPage />
    <AboutPage />
    <ReviewsPage />
    <ContactsPage />
  </>
);

export default HomePage;
