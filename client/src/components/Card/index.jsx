import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import rollercoaster from "../../assets/img/rollercoaster.png";

const StyledCard = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: '3rem',
    marginBottom:'3rem',
    padding: '16px',
    paddingTop: '0',
    backgroundColor: '#3f3f3f',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '600px',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '800px',
    },
}));

const StyledImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: '16px',
   
});

const StyledImage = styled('img')({
    width: '100%',
    height: 'auto',
    display: 'block',
});

const StyledTypography = styled(Typography)({
    textAlign: 'center',
    margin: '16px 0',
});

const StyledDescription = styled(Typography)({
    textAlign: 'justify',
    marginBottom: '16px',
    hyphens: 'auto', // Enable hyphenation
    wordBreak: 'break-word', // Allow words to break
    overflowWrap: 'break-word', // Ensure words break to avoid overflow
    fontSize: '14px',
});

const DescriptionContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // Ensure it fills the remaining space in the card
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
});

const Card = ({ name, img, description, category }) => {
    return (
        <StyledCard>
            
            <StyledTypography variant="h3">{name}</StyledTypography>
            <DescriptionContainer>
            <StyledImageContainer>
                <StyledImage src={rollercoaster} alt={name} />
            </StyledImageContainer>
                <Box>
                    <StyledDescription variant="body1">{description}</StyledDescription>
                    <StyledDescription variant="body2">{category}</StyledDescription>
                </Box>
                <ButtonContainer>
                    <Button variant="contained" color="primary">Plus de photos</Button>
                </ButtonContainer>
            </DescriptionContainer>
        </StyledCard>
    );
};

export default Card;

