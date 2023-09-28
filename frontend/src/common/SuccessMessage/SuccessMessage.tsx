import React from 'react';
import { Book } from '../../data/BookInterface';

interface SuccessMessageProps {
  message: string | null;
  book: Book | null;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {

  if (!message) {
    return null;
  }

  const successMessageStyle = {
    backgroundColor: '#E5C6A7',
    color: 'white',
    padding: '10px',
    borderRadius: '60px',
  }

  return (
    <div className="success-message" style={successMessageStyle}>
      {message}
    </div>
  );
};

export default SuccessMessage;
