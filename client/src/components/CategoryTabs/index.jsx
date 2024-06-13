import  { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import API_URL from '../../config.js';
import { Box, Button, MenuItem, Select, useMediaQuery, Grid } from '@mui/material';
import { styled } from '@mui/system';

const CategoryButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));
const StyledSelect = styled(Select)(({ theme }) => ({
    borderColor: 'white',
    backgroundColor: 'var(--dark_gray)',
    color: 'white',
    padding: '0',
    alignItems: 'center',
    borderRadius: '30px', // Added borderRadius
    border: '1.5px solid white',
    '& .MuiSelect-icon': {
        color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
        padding: '0',
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
    borderRadius: '12px', // Added borderRadius
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
    
}));
const PlaceholderText = styled('em')(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.5)', // Light color to mimic placeholder
    
}));


const CategoryTabs = () => {
    const { categories, setCategories, setAttractions, resetCategory  } = useContext(Context);
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
        if (selectedCategory === 'all') {
            resetCategory();
            navigate('/attractions');
        } else {
            navigate(`/attractions/${selectedCategory}`);
        }
    };

    const handleSelectChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === 'all') {
            resetCategory();
            navigate('/attractions');
        } else {
            navigate(`/attractions/${selectedCategory}`);
        }
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
                        placeholder="Choisir une catégorie"
                        fullWidth
                        open={open}
                        onOpen={handleOpen}
                        onClose={() => setOpen(false)}
                        renderValue={(selected) => {
                            if (selected === "all") {
                                return <PlaceholderText>Choisir une catégorie</PlaceholderText>;
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
                        <StyledMenuItem value="all"><em>Choisir une catégorie</em></StyledMenuItem>
                        {categories.map((category) => (
                            <StyledMenuItem key={category.id} value={category.slug}>
                                {category.name}
                            </StyledMenuItem>
                        ))}
                    </StyledSelect>
                </CenteredBox>
            ) : (
                <CenteredBox>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <CategoryButton variant="contained" value={"all"} onClick={handleClick}>
                                Toutes les attractions
                            </CategoryButton>
                        </Grid>
                        {categories.map((category) => (
                            <Grid item key={category.id}>
                                <CategoryButton
                                    variant="contained"
                                    onClick={handleClick}
                                    value={category.slug}
                                >
                                    {category.name}
                                </CategoryButton>
                            </Grid>
                        ))}
                    </Grid>
                </CenteredBox>
            )}
        </Box>
    );
}
export default CategoryTabs;