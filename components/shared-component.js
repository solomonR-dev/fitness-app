import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import {
  Button as PaperButton,
  Text,
  TextInput as PaperTextInput,
  IconButton,
} from "react-native-paper";
import styled from "styled-components";

export const Button = styled(PaperButton)`
  margin: 10px;
`;

export const TextInput = styled(PaperTextInput)`
  margin: 10px;
`;

export const HeaderText = styled(Text)`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 150% */
`;

export const SubGrayedText = styled(Text)`
  color: var(--gray-2, #ada4a5);
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 150% */
`;

export const CenterdView = styled(View)`
  align-items: center;
`;
