import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const sizeVariant = {
  small: "4px",
  medium: "8px",
  large: "16px",
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginTight",
  bottom: "marginBottom",
};

const getVariant = (position, size) =>
  `${positionVariant[position]}:${sizeVariant[size]}`;
export const Spacer = styled.View`
  ${({ position, size }) => getVariant(position, size)}
`;

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
