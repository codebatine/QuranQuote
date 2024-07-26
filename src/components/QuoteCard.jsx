import PropTypes from 'prop-types';

const QuoteCard = ({ quote, fetchQuote }) => {
  return (
    <div className="card">
      <p>{quote}</p>
      <button className="button" onClick={fetchQuote}>Get Random Ayah</button>
    </div>
  );
};

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  fetchQuote: PropTypes.func.isRequired,
};

export default QuoteCard;
