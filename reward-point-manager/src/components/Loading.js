/**
 * @fileoverview Loading component to display a loading spinner.
 */

import React from 'react';
import '../styles/Loading.scss';

/**
 * Renders a loading spinner.
 * @returns {JSX.Element} Loading component.
 */
const Loading = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export default Loading;
