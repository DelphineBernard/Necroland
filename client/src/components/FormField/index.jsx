import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';

const FormField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
      },
      '&.Mui-error': {
        backgroundColor: '#ffcccc',
      },
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: 'transparent',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'transparent',
    },
    '& .MuiInputLabel-filled': {
      color: grey[600],
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  }));

export default FormField;