import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import {
  Box, Container, TextField, Typography,
} from '@mui/material';
import AuthForm from 'components/authform';
import SectionTitle from 'components/sectiontitle';
import { useRootSelector } from 'store';
import { selectAuthLoading } from 'store/selectors';
import { createLoginActionThunk } from 'store/action-creators';
import { useRootDispatch } from 'store/hooks';

type LoginValues = {
  email: string,
  password: string,
};

type LoginFormikConfig = FormikConfig<LoginValues>;

const initialValues: LoginValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required('El. paštas yra privalomas')
    .min(6, 'Mažiausiai 6 simboliai')
    .email('Netinkamas el. pašto formatas'),
  password: Yup.string()
    .required('Slaptažodis yra privalomas')
    .min(8, 'Mažiausiai 8 simboliai')
    .max(32, 'Daugiausiai 32 simboliai')
    .matches(/[A-Z]/, 'Bent viena didžioji raidė privaloma')
    .matches(/[a-z]/, 'Bent viena mažoji raidė privaloma')
    .matches(/\d/, 'Skaičius yra privalomas'),
});

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loading = useRootSelector(selectAuthLoading);
  const dispatch = useRootDispatch();

  const handleLogin: LoginFormikConfig['onSubmit'] = ({ email, password }) => {
    const redirect = searchParams.get('redirect') ?? '/';
    const loginAction = createLoginActionThunk({ email, password }, redirect);
    dispatch(loginAction);
  };

  const {
    values,
    touched,
    errors,
    dirty,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<LoginValues>({
    initialValues,
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <Container sx={{ my: 5 }}>
      <SectionTitle title="Prisijungimas" description="Prisijungti prie TVS" />
      <AuthForm
        btnActive={dirty && isValid}
        onSubmit={handleSubmit}
      >
        <TextField
          name="email"
          type="email"
          label="El. paštas"
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          disabled={loading}
        />
        {touched.email && errors.email ? (
          <Typography sx={{
            my: 0, fontSize: 12, color: 'red', textAlign: 'center',
          }}
          >
            {errors.email}
          </Typography>
        ) : <Box sx={{ my: '9px' }} />}
        <TextField
          name="password"
          type="password"
          label="Slaptažodis"
          fullWidth
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          disabled={loading}
        />
        {touched.password && errors.password ? (
          <Typography sx={{
            my: 0, fontSize: 12, color: 'red', textAlign: 'center',
          }}
          >
            {errors.password}
          </Typography>
        ) : <Box sx={{ my: '9px' }} />}
      </AuthForm>
    </Container>
  );
};

export default LoginPage;
