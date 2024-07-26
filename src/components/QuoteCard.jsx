import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  max-width: 600px;
  text-align: center;
  width: 100%;
`;

const Button = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuoteCard = ({ quote, fetchQuote }) => {
  return (
    <Card>
      <p>{quote}</p>
      <Button onClick={fetchQuote}>Get Random Ayah</Button>
    </Card>
  );
};

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  fetchQuote: PropTypes.func.isRequired,
};

export default QuoteCard;