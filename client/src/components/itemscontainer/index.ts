import { Container, styled } from '@mui/material';

const ItemsContainer = styled(Container)({
  display: 'flex',
  padding: '20px 0',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '30px',
  rowGap: '50px',

});

export default ItemsContainer;
