import React, { useState } from 'react';
import {
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import FolderIcon from '@mui/icons-material/Folder';
import { Category } from 'types';

type CategoryListItemProps = Category & {
  deleteCategory: (categoryId: string) => void,
  updateCategory: (categoryId: string, title: string) => void,
};

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  id, title, deleteCategory, updateCategory,
}) => {
  const [value, setValue] = useState(title);
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEnabling = () => {
    setEnabled(true);
  };

  return (
    <Grid container columnSpacing={2} sx={{ textAlign: 'center', pb: 1 }}>
      <Grid item sx={{ display: 'flex' }}>
        <FolderIcon fontSize="large" sx={{ color: 'bakery.main' }} />
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField size="small" value={value} onChange={handleChange} disabled={!enabled} />
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="small" onClick={() => handleEnabling()}>
          <EditIcon />
        </IconButton>
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="small" onClick={() => updateCategory(id, value)} disabled={!value}>
          <SaveIcon />
        </IconButton>
      </Grid>
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="small" onClick={() => deleteCategory(id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>

  );
};
export default CategoryListItem;
