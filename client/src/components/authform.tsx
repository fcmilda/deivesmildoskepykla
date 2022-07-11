import React from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CircularProgress from '@mui/material/CircularProgress';
import { useRootSelector } from '../store';
import { selectAuthError, selectAuthLoading } from '../store/selectors';
import { useRootDispatch } from '../store/hooks';
import { authClearErrorAction } from '../store/action-creators';

type AuthFormProps = {
  btnActive?: boolean,
  onSubmit?: React.FormEventHandler<HTMLFormElement>,
};

const AuthForm: React.FC<AuthFormProps> = ({
  btnActive = true,
  onSubmit,
  children,
}) => {
  const dispatch = useRootDispatch();
  const loading = useRootSelector(selectAuthLoading);
  const error = useRootSelector(selectAuthError);

  const clearError = () => {
    dispatch(authClearErrorAction);
  };

  return (
    <>
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Alert
            sx={{
              position: 'absolute',
              mt: 3,
            }}
            color="error"
            onClose={clearError}
          >
            {error}
          </Alert>
        </Box>
      )}
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
        onSubmit={onSubmit}
      >
        <VpnKeyIcon color="primary" sx={{ fontSize: 45 }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 1 / 1,
          my: 2,
        }}
        >
          {children}
        </Box>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!btnActive || loading}
          sx={{ width: '120px' }}
        >
          {loading ? <CircularProgress size="26px" /> : 'Prisijungti'}
        </Button>
      </Paper>
    </>
  );
};

export default AuthForm;
