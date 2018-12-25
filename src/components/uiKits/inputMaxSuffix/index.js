import React from 'react';
import PropTypes from 'prop-types';

export default function InputMaxSuffix({ maxLength, value }) {
  const len = value.length;
  const style = {};
  if (len > maxLength) {
    style.color = '#FF5050';
  }
  return (
    <span style={{ color: '#bbb' }}>
      <span style={style}>{len}</span>
      {`/${maxLength}`}
    </span>
  );
}

InputMaxSuffix.propTypes = {
  maxLength: PropTypes.number.isRequired,
  value: PropTypes.string,
};

InputMaxSuffix.defaultProps = {
  value: '',
};
