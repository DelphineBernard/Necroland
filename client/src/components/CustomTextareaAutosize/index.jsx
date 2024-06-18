import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const CustomTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    fontFamily: 'Roboto, sans-serif',
    padding: '16px 12px',
    borderRadius: '4px 4px 0 0',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.12)',
    resize: 'vertical',
    '&:focus': {
      outline: 'none',
      borderColor: '#3f51b5',
    },
    '&.Mui-error': {
      backgroundColor: '#ffcccc',
    },
    '&::placeholder': {
        fontSize: '0.80rem',
      },
      '@media (min-width:600px)': {
        '&::placeholder': {
          fontSize: '0.85rem',
        },
      },
      '@media (min-width:960px)': {
        '&::placeholder': {
          fontSize: '1rem',
        },
      },
  }));

  export default CustomTextareaAutosize;