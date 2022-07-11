import React, { useState, useEffect } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { selectCategories } from 'store/selectors';
import { categoriesFetchCategoriesActionThunk } from 'store/action-creators';
import { useRootSelector, useRootDispatch } from '../../../store/hooks';

const ChangeCategorySelect = (props: { onChange: (value: string) => void }) => {
  const { onChange } = props;
  const [category, setCategory] = useState('');
  const categories = useRootSelector(selectCategories);
  const dispatch = useRootDispatch();

  useEffect(() => {
    dispatch(categoriesFetchCategoriesActionThunk);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ ml: '20px', width: '150px' }}>
      <InputLabel>Kategorija</InputLabel>
      <Select
        id="category-select"
        value={category}
        label="category"
        onChange={handleChange}
      >
        <MenuItem value="">Visos kategorijos</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChangeCategorySelect;
