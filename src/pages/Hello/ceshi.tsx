import React from 'react';

const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : null;

export default MyConditionalComponent;