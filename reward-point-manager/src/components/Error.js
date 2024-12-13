/**
 * @fileoverview Error component to display error messages.
 */

import React from 'react';
import '../styles/Error.scss';

/**
 * Renders an error message.
 * @param {Object} props - Component properties.
 * @param {string} props.message - Error message to display.
 * @returns {JSX.Element} Error component.
 */
const Error = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

export default Error;
