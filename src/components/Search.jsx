import PropTypes from 'prop-types';

const Search = ({ onSearchChange }) => {
  return (
    <input 
      type="text" 
      className="search-input" 
      placeholder="Search..." 
      onChange={(e) => onSearchChange(e.target.value)} 
    />
  );
};

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
