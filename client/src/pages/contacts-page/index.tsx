import React from 'react';
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import {
  Typography, Container, Box, TextField, Button, Paper, Alert,
} from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SectionTitle from 'components/sectiontitle';
import emailjs from 'emailjs-com';

type ContactFormValues = {
  name: string,
  email: string,
  message: string
};

type ContactsFormikConfig = FormikConfig<ContactFormValues>;

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Vardas turi būti iki 15 simbolių')
    .required('Šis laukas privalomas'),
  email: Yup.string()
    .email('Neteisingas el. pašto formatas')
    .required('Šis laukas privalomas'),
  message: Yup.string()
    .max(200, 'Žinutė turi būti iki 200 simbolių')
    .required('Šis laukas privalomas'),
});

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string;
const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID as string;

const ContactsPage: React.FC = () => {
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmitContactForm: ContactsFormikConfig['onSubmit'] = (values) => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, values, USER_ID)
      .then(() => {
        console.log('email sent');
      });
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<ContactFormValues>({
    initialValues,
    onSubmit: handleSubmitContactForm,
    validationSchema,
  });

  return (
    <Container id="contacts" sx={{ mb: 5, height: '100vh' }}>
      <SectionTitle title="Kontaktai" description="Susisiekite su mumis" />
      <Paper
        component="form"
        elevation={3}
        sx={{
          display: 'flex',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          p: 3,
          width: { xs: 300, sm: 500 },

        }}
        onSubmit={handleSubmit}
      >
        <ContactMailIcon color="primary" sx={{ fontSize: 45 }} />
        <Box sx={{
          display: 'flex',
          width: 1 / 1,
          my: 2,
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              sx={{ mb: 1, mr: { xs: 0, sm: 2 } }}
              id="name"
              name="name"
              label="Jūsų vardas"
              variant="outlined"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name ? (
              <Typography sx={{ my: 0, fontSize: 12, color: 'red' }}>
                {errors.name}
              </Typography>
            ) : <Box sx={{ my: '9px' }} />}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              sx={{ mb: 1 }}
              id="email"
              name="email"
              label="El. paštas"
              variant="outlined"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <Typography sx={{ my: 0, fontSize: 12, color: 'red' }}>
                {errors.email}
              </Typography>
            ) : <Box sx={{ my: '9px' }} />}
          </Box>
        </Box>
        <Box>
          <TextField
            sx={{ width: { xs: '250px', sm: '435px' }, mt: 1 }}
            id="message"
            name="message"
            label="Žinutė"
            variant="outlined"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          {touched.message && errors.message ? (
            <Typography sx={{ mt: 1, fontSize: 12, color: 'red' }}>
              {errors.message}
            </Typography>
          ) : <Box sx={{ my: '26px' }} />}
        </Box>
        {isSubmitting && <Alert severity="success">{`${values.name}, jūsų žinutė išsiųsta.`}</Alert>}
        <Box>
          <Button variant="contained" size="large" type="submit" sx={{ boxShadow: '0', mt: 2 }}>Siųsti</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactsPage;
