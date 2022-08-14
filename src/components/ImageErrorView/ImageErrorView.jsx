import React from 'react';
import styled from 'styled-components';

export default function ImageErrorView({ message }) {
  return <Error role="alert">{message}</Error>;
}

const Error = styled.h1`
  color: #3f51b5;
  margin: auto;
`;
