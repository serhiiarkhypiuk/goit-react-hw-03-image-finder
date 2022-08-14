import React from "react";
import styled from "styled-components";

export const Button = ({ onClick }) => {
  return (
    <LoadButton type="button" onClick={onClick}>Load More</LoadButton>
  )
}

const LoadButton = styled.button`
  background-color: #3f51b5;
  font-size: 16px;
  font-weight: bold;
  width: 45%;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 0.5rem 0;
  border-radius: 2px;
  margin: auto;
`