import React from 'react';
import checkPermissions from './checkPermissions';

export default function Authorized(props) {
  const { authority, children = null, noMatch = null, onUnMatched } = props;
  return checkPermissions(authority, children, noMatch, onUnMatched);
}
