import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import styled from "styled-components/native";
const { Title: CardTitle, Actions, Content, Cover } = Card;
import favoriteBorder from "../../../../assets/favoriteBorder";
import burn from "../../../../assets/burn";
import { Spacer } from "../../../spacer/spacer.component";
const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  padding: 10px 0px 10px 0px;
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.ui.primary};
`;

const BodyText = styled(Text)`
  color: ${(props) => props.theme.colors.ui.primary};
`;

const ExerciceCard = styled(Card)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const RestaurantCardCover = styled(Cover)`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Info = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const Rating = styled.View`
  flex-direction: row;
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export default ExercicesInfos = ({ training }) => {
  const { name, description, photo, rating } = training;
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <ExerciceCard style={styles.container} elevation={5}>
      <Cover key={name} source={{ uri: photo }} />
      <Content>
        <Title>{name}</Title>
        <Section>
          <Rating>
            {ratingArray.map((index) => (
              <SvgXml key={index} xml={favoriteBorder} />
            ))}
          </Rating>
          <SectionEnd>
            <Spacer>
              {true && <SvgXml xml={burn} width={20} height={20} />}
            </Spacer>
          </SectionEnd>
        </Section>

        <BodyText>{description}</BodyText>
        {/* </Info> */}
      </Content>
    </ExerciceCard>
  );
};

const styles = StyleSheet.create({});
