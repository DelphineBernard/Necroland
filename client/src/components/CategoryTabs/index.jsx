import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    border: '2px solid wite',
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
    const { categories, setCategories, setAttractions, category, setCategory } = useContext(Context);
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
        setCategory(selectedCategory);
        localStorage.setItem('selectedCategory', selectedCategory);
        navigate(`/attractions/${selectedCategory !== "all" ? selectedCategory : ""}`);
    };

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        localStorage.setItem('selectedCategory', selectedCategory);
        navigate(`/attractions/${selectedCategory !== "all" ? selectedCategory : ""}`);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        fetchCategories();
        // Retrieve the selected category from localStorage
        const savedCategory = localStorage.getItem('selectedCategory') || "all";
        setCategory(savedCategory);
    }, []);

    useEffect(() => {
        fetchAttractions(category);
    }, [category]);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Box>
            {isMobile ? (
                <CenteredBox>
                    <StyledSelect
                        value={category}
                        onChange={handleSelectChange}
                        variant="outlined"
                        displayEmpty
                        fullWidth
                        open={open}
                        onOpen={handleOpen}
                        onClose={() => setOpen(false)}
                        renderValue={(selected) => {
                            if (selected === "all") {
                                return <em>Choisir une catégorie</em>;
                            }
                            return categories.find((cat) => cat.slug === selected)?.name || "";
                        }}
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
                        <StyledMenuItem value="all"><em>Toutes les attractions</em></StyledMenuItem>
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
};

export default CategoryTabs;