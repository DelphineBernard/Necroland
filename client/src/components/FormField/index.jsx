import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';

const Field = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
        color: 'white',
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
    '& .MuiFilledInputLabel-root': {
      color: grey[600],
    },
    '& .MuiFilledInputLabel-formControl': {
      color: grey[600],
    },
    '& .MuiInputBase-input': {
      color: 'white',
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

  const FormField = styled(Field)({
    '& > :not(style)': { 
      maxWidth: '100%',
    },
  });

export default FormField;