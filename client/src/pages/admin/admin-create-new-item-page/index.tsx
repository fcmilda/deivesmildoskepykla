import React, { useEffect, useState } from 'react';
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import {
  Box, Container, TextField, Paper, Button, MenuItem, SelectChangeEvent, Select,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useRootDispatch, useRootSelector } from 'store/hooks';
import { categoriesFetchCategoriesActionThunk, createItemsNewItemActionThunk } from 'store/action-creators';
import SectionTitle from 'components/sectiontitle';
import { ItemCreate } from 'types';
import { selectCategories } from 'store/selectors';
import pause from '../../../helpers/pause';

type CreateNewItemFormikConfig = FormikConfig<ItemCreate>;

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Privalomas laukas'),
  description: Yup.string()
    .required('Privalomas laukas')
    .max(44, 'Daugiausiai 44 simboliai'),
  price: Yup.number()
    .required('Privalomas laukas')
    .positive('Turi būti teigiamas skaičius'),
  weight: Yup.number()
    .required('Privalomas laukas')
    .positive('Turi būti teigiamas skaičius'),
  composition: Yup.string()
    .required('Privalomas laukas')
    .min(30, 'Mažiausiai 30 simbolių'),
});

const AdminCreateNewItemPage: React.FC = () => {
  const dispatch = useRootDispatch();
  const navigate = useNavigate();
  const categories = useRootSelector(selectCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const initialValues = {
    composition: '',
    description: '',
    img: '',
    price: 0,
    title: '',
    weight: 0,
    categories: [],
  };

  const handleSubmitForm: CreateNewItemFormikConfig['onSubmit'] = (item) => {
    const createAction = createItemsNewItemActionThunk({ ...item, categories: selectedCategories });
    dispatch(createAction);
    pause(2000);
    navigate('/admin');
  };

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    dispatch(categoriesFetchCategoriesActionThunk);
  }, []);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<ItemCreate>({
    initialValues,
    onSubmit: handleSubmitForm,
    validationSchema,
  });

  return (
    <Container sx={{ my: 5 }}>
      <SectionTitle title="Sukurti naują produktą" description="" />

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
          width: 400,
        }}
        onSubmit={handleSubmit}
      >
        <EditIcon color="primary" sx={{ fontSize: 45 }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 1 / 1,
          my: 2,
        }}
        >
          <TextField
            name="title"
            type="text"
            label="Pavadinimas"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            name="description"
            type="text"
            label="Aprašymas"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <TextField
            name="price"
            type="number"
            label="Kaina, €"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && Boolean(errors.price)}
            helperText={touched.price && errors.price}
          />
          <TextField
            name="weight"
            type="number"
            label="Svoris, kg"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.weight}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.weight && Boolean(errors.weight)}
            helperText={touched.weight && errors.weight}
          />
          <TextField
            name="composition"
            type="text"
            label="Sudedamosios dalys"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.composition}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.composition && Boolean(errors.composition)}
            helperText={touched.composition && errors.composition}
          />
          <TextField
            name="img"
            type="text"
            label="Nuotraukos url"
            fullWidth
            inputProps={{ autoComplete: 'off' }}
            value={values.img}
            onChange={handleChange}
          />
          <Select
            name="categories"
            multiple
            value={selectedCategories}
            onChange={handleSelectChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ width: '120px' }}
        >
          Sukurti
        </Button>
        <Button href="/admin">Grįžti į administratoriaus puslapį</Button>
      </Paper>
    </Container>
  );
};

export default AdminCreateNewItemPage;
