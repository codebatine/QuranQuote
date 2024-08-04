import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchInput = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
`;

const Search = ({ onSearchChange }) => {
  return (
    <SearchInput 
      type="text" 
      placeholder="Search..." 
      onChange={(e) => onSearchChange(e.target.value)} 
    />
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
