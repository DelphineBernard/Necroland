import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import rollercoaster from "../../assets/img/rollercoaster.png";

const StyledCard = styled(Box)(({ theme }) => ({
    width: '100%',
    margin: '0 auto',
    padding: '16px',
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
    width: 'calc(100% + 64px)', // Further increase the width to create more overflow effect
    margin: '-32px 0 16px -32px', // Adjust the margin to position the image correctly
    overflow: 'hidden',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
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

const Card = ({ name, img, description, category }) => {
    return (
        <StyledCard>
            <StyledImageContainer>
                <StyledImage src={rollercoaster} alt={name} />
            </StyledImageContainer>
            <StyledTypography variant="h3">{name}</StyledTypography>
            <Box>
                <StyledDescription variant="body1">{description}</StyledDescription>
                <StyledDescription variant="body2">{category}</StyledDescription>
                <Button variant="contained" color="primary">Plus de photos</Button>
            </Box>
        </StyledCard>
    );
};

export default Card;
