import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import API_URL from '../../config.js';
import { Box, Button, MenuItem, Select, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const CategoryButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    borderColor: 'white',
    backgroundColor: 'var(--dark_gray)',
    color: 'white',
    alignItems: 'center',
    borderRadius: '30px', // Added borderRadius
    '& .MuiSelect-icon': {
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
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiSelect-select': {
        color: 'white',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: '#181717',
    color: 'white',
    borderRadius: '30px', // Added borderRadius
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    },
    '&.Mui-selected': {
        backgroundColor: 'gray',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
        },
    },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '16px 0'
}));

const CategoryTabs = () => {
    const { categories, setCategories, setAttractions } = useContext(Context);
    const { category } = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAttractions = async (category) => {
        try {
            let response;
            if (category === "all" || !category) {
                response = await fetch(`${API_URL}/attractions`);
            } else {
                response = await fetch(`${API_URL}/attractions/${category}`);
            }
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (event) => {
        const selectedCategory = event.target.value;
        navigate(`/attractions/${selectedCategory !== "all" ? selectedCategory : ""}`);
    };

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        navigate(`/attractions/${selectedCategory !== "all" ? selectedCategory : ""}`);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchAttractions(category);
    }, [category]);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Box>
            {isMobile ? (
                <CenteredBox>
                    <StyledSelect
                        value={category || "all"}
                        onChange={handleSelectChange}
                        variant="outlined"
                        fullWidth
                        open={open}
                        onOpen={handleOpen}
                        onClose={() => setOpen(false)}
                        MenuProps={{
                            PaperProps: {
                                className: 'centered-menu',
                                sx: {
                                    bgcolor: '#181717',
                                    borderRadius: '30px',
                                    margin: '5px 0',
                                    border: '2px solid white',
                                },
                            },
                        }}
                    >
                        <StyledMenuItem value="all">Toutes les attractions</StyledMenuItem>
                        {categories.map((category) => (
                            <StyledMenuItem key={category.id} value={category.slug}>
                                {category.name}
                            </StyledMenuItem>
                        ))}
                    </StyledSelect>
                </CenteredBox>
            ) : (
                <>
                    <CategoryButton variant="contained" value={"all"} onClick={handleClick}>
                        Toutes les attractions
                    </CategoryButton>
                    {categories.map((category) => (
                        <CategoryButton
                            variant="contained"
                            onClick={handleClick}
                            key={category.id}
                            value={category.slug}
                        >
                            {category.name}
                        </CategoryButton>
                    ))}
                </>
            )}
        </Box>
    );
}

export default CategoryTabs;