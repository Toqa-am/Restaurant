import React, { useState } from 'react';
import Message from '../../Componenets/Message';

const Test = () => {
  const [message, setMessage] = useState(null);

  const handleShowMessage = (msg, type) => {
    setMessage({ text: msg, type });
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div>
      <button onClick={() => handleShowMessage('Operation successful!', 'success')}>Show Success</button>
      <button onClick={() => handleShowMessage('An error occurred.', 'error')}>Show Error</button>
      <button onClick={() => handleShowMessage('Warning: Check this out!', 'warning')}>Show Warning</button>
      {message && (
        <Message
          message={message.text}
          type={message.type}
          onClose={handleCloseMessage}
        />
      )}
    </div>
  );
};

export default Test;
