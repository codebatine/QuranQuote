import PropTypes from 'prop-types';

const QuoteCard = ({ quote, fetchQuote }) => {
  return (
    <div className="quote-card">
      <blockquote>{quote}</blockquote>
      <button className="quote-button" onClick={fetchQuote}>
        Get Random Ayah
      </button>
    </div>
  );
};

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  fetchQuote: PropTypes.func.isRequired,
};

export default QuoteCard;
