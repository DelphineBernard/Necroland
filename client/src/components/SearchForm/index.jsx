import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import slugify from 'slugify';
import API_URL from '../../config.js';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Styled components for the form container, form, and suggestions
const StyledFormContainer = styled('div')({
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
});

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: 'var(--dark_gray)',
    borderColor: 'white',
    padding: '0',
    border: '2px solid white',
    width: '100%',
    maxWidth: '600px',
    '@media (min-width: 600px)': {
        width: '50%',
    },
    '@media (min-width: 960px)': {
        width: '40%',
    },
    '& input': {
        flex: 1,
        border: 'none',
        outline: 'none',
        backgroundColor: 'var(--dark_gray)',
        color: 'white',
        padding: '8px 12px',
        fontSize: '1rem',
        borderRadius: '30px',
    },
    '& .search-icon': {
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: 'white',
        padding: '8px',
        cursor: 'pointer',
        '&:hover': {
            color: '#007FFF',
        },
    }
}));

const StyledSuggestions = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    margin: 0,
    padding: '0',
    backgroundColor: '#181717',
    border: '2px solid white',
    borderRadius: '12px',
    position: 'relative',
    top: '8px', 
    left: 0,
    maxHeight: '140px',
    overflow: 'auto',
    width: '100%',
    maxWidth: '600px',
    '@media (min-width: 600px)': {
        width: '50%',
    },
    '@media (min-width: 960px)': {
        width: '40%',
    },
    zIndex: 1000,
    '& li': {
        padding: '8px 12px',
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '30px'
        }
    },
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '3px solid var(--dark_gray)',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'var(--dark_gray)',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-button:single-button': {
        backgroundColor: 'white',
        height: '12px',
        width: '12px',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-button:single-button:vertical:decrement': {
        borderBottom: '2px solid var(--dark_gray)',
    },
    '&::-webkit-scrollbar-button:single-button:vertical:increment': {
        borderTop: '2px solid var(--dark_gray)',
    },
}));

const SearchForm = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const { tags, setTags, setAttractions, tagSearched, setTagSearched, resetCategory } = useContext(Context);
    const [filteredTags, setFilteredTags] = useState([]); // State for filtered tags
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false); // State for suggestion dropdown visibility
    const suggestionsRef = useRef(null);
    const searchBarRef = useRef(null);

    // Fetch tags from the API
    const fetchTags = async () => {
        try {
            const response = await fetch(`${API_URL}/tags`);
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle search by tag
    const handleSearchByTag = async (event) => {
        try {
            event.preventDefault();
            const tag = slugify(event.target[0].value, { remove: /[*+~.()'"!:@]/g, lower: true });
            if (tag) {
                const response = await fetch(`${API_URL}/attractions/tags/${tag}`);
                const data = await response.json();
                setAttractions(data.attractions.Attractions);
                setFilteredTags([]);
                setIsSuggestionsOpen(false);
            } else {
                fetchAllAttractions();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch all attractions
    const fetchAllAttractions = async () => {
        try {
            const response = await fetch(`${API_URL}/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle input change
    const handleChange = (event) => {
        const value = event.target.value;
        setTagSearched(value);
        if (value) {
            const slugifiedValue = slugify(value, { remove: /[*+~.()'"!:@]/g, lower: true });
            const filtered = tags.filter(tag => tag.slug.startsWith(slugifiedValue));
            setFilteredTags(filtered);
            setIsSuggestionsOpen(true);
        } else {
            setFilteredTags(tags);
            fetchAllAttractions();
            setIsSuggestionsOpen(false);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = async (suggestion) => {
        setTagSearched(suggestion.name);
        setFilteredTags([]);
        setIsSuggestionsOpen(false);
        const tag = slugify(suggestion.name, { remove: /[*+~.()'"!:@]/g, lower: true });
        const response = await fetch(`${API_URL}/attractions/tags/${tag}`);
        const data = await response.json();
        setAttractions(data.attractions.Attractions);
    };

    // Handle search bar click
    const handleClick = () => {
        if (isSuggestionsOpen) {
            setIsSuggestionsOpen(false);
        } else {
            resetCategory();
            setFilteredTags(tags);
            navigate('/attractions');
            setIsSuggestionsOpen(true);
        }
    };

    // Reset search
    const resetSearch = () => {
        setTagSearched("");
        setFilteredTags([]);
        setIsSuggestionsOpen(false);
    };

    // Handle click outside the search bar to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                resetSearch();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchBarRef]);

    // Fetch tags and all attractions when component mounts
    useEffect(() => {
        fetchTags();
        fetchAllAttractions();
    }, []);

    // Auto-close suggestions after a delay
    useEffect(() => {
        if (filteredTags.length > 0) {
            const timer = setTimeout(() => {
                resetSearch();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [filteredTags]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
            <StyledFormContainer ref={searchBarRef}>
                <StyledForm onSubmit={handleSearchByTag}>
                    <input
                        type="text"
                        value={tagSearched}
                        onChange={handleChange}
                        onClick={handleClick}
                        autoComplete="off"
                        placeholder="Recherche par Tag"
                    />
                    <button type="submit" className="search-icon">
                        <SearchIcon />
                    </button>
                </StyledForm>
                {isSuggestionsOpen && filteredTags.length > 0 && (
                    <StyledSuggestions ref={suggestionsRef}>
                        {/* Map through the filteredTags array and display each tag as a list item */}
                        {filteredTags.map((tag) => (
                            <li key={tag.id} onClick={() => handleSuggestionClick(tag)}>
                                {tag.name}
                            </li>
                        ))}
                    </StyledSuggestions>
                )}
            </StyledFormContainer>
        </Box>
    );
}

export default SearchForm;