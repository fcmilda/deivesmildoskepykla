import React from 'react';
import { Container, Typography } from '@mui/material';

type SectionTitleProps = {
  title: string,
  description: string,
};

const SectionTitle = ({ title, description }: SectionTitleProps) => (
  <Container sx={{ my: 5, textAlign: 'center' }}>
    <Typography component="h2" variant="h3">{title}</Typography>
    <Typography component="p" variant="body1" sx={{ fontStyle: 'italic' }}>{description}</Typography>
  </Container>
);

export default SectionTitle;
