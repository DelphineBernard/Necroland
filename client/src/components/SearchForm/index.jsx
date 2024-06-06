import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import slugify from 'slugify';
import API_URL from '../../config.js';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: 'var(--dark_gray)',
    borderColor: 'white',
    padding: '3px 12px',
    border: '2px solid white',
    width: '100%',
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
    backgroundColor: 'var(--dark_gray)',
    border: '2px solid white',
    marginTop: '8px',
    maxHeight: '140px', // Limit the height to 3 items (approximately 150px)
    overflow: 'auto', // Add scroll bar if content exceeds maxHeight
    width: '100%',
    '@media (min-width: 600px)': {
        width: '50%',
    },
    '@media (min-width: 960px)': {
        width: '40%',
    },
    '& li': {
        padding: '8px 12px',
        color: 'white',
        cursor: 'pointer',
        margin: '0 10px',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '30px'
        }
    },
    /* Custom scrollbar styles */
    '&::-webkit-scrollbar': {
        width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '3px solid var(--dark_gray)', // Creates space around thumb
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
    const navigate = useNavigate(); // Add useNavigate hook
    const { tags, setTags, setAttractions, tagSearched, setTagSearched, resetCategory } = useContext(Context);
    const [filteredTags, setFilteredTags] = useState([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false); // State to track if suggestions are open
    const suggestionsRef = useRef(null);
    const searchBarRef = useRef(null); // Add a reference for the global component

    const fetchTags = async () => {
        try {
            const response = await fetch(`${API_URL}/tags`);
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.log(error);
        }
    };

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

    const fetchAllAttractions = async () => {
        try {
            const response = await fetch(`${API_URL}/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setTagSearched(value);

        if (value) {
            const slugifiedValue = slugify(value, { remove: /[*+~.()'"!:@]/g, lower: true });
            const filtered = tags.filter(tag => tag.slug.startsWith(slugifiedValue));
            setFilteredTags(filtered);
            setIsSuggestionsOpen(true);
        } else {
            setFilteredTags(tags); // Show all tags if the input is empty
            fetchAllAttractions(); // Reset to all attractions if the input is empty
            setIsSuggestionsOpen(false);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setTagSearched(suggestion.name);
        setFilteredTags([]);
        setIsSuggestionsOpen(false);
        const tag = slugify(suggestion.name, { remove: /[*+~.()'"!:@]/g, lower: true });
        const response = await fetch(`${API_URL}/attractions/tags/${tag}`);
        const data = await response.json();
        setAttractions(data.attractions.Attractions);
    };

    const handleClick = () => {
        if (isSuggestionsOpen) {
            setIsSuggestionsOpen(false);
        } else {
            resetCategory(); // Reset category when the input is focused
            setFilteredTags(tags); // Show all tags when input is focused
            navigate('/attractions/'); // Navigate to /attractions/
            setIsSuggestionsOpen(true);
        }
    };

    const resetSearch = () => {
        setTagSearched("");
        setFilteredTags([]);
        setIsSuggestionsOpen(false);
    };

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

    useEffect(() => {
        fetchTags();
        fetchAllAttractions();
    }, []);

    useEffect(() => {
        if (filteredTags.length > 0) {
            const timer = setTimeout(() => {
                resetSearch();
            }, 10000); // Close after 10 seconds
            return () => clearTimeout(timer);
        }
    }, [filteredTags]);

    return (
        <div className="searchBar" ref={searchBarRef}>
            <StyledForm onSubmit={handleSearchByTag}>
                
                <input
                    type="text"
                    value={tagSearched}
                    onChange={handleChange}
                    onClick={handleClick} // Toggle suggestions open/close on click
                    autoComplete="off"
                    placeholder="Recherche par Tag"
                />
                <button type="submit" className="search-icon">
                    <SearchIcon />
                </button>
            </StyledForm>
            {isSuggestionsOpen && filteredTags.length > 0 && (
                <StyledSuggestions ref={suggestionsRef}>
                    {filteredTags.map((tag) => (
                        <li key={tag.id} onClick={() => handleSuggestionClick(tag)}>
                            {tag.name}
                        </li>
                    ))}
                </StyledSuggestions>
            )}
        </div>
    );
}

export default SearchForm;