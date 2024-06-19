import styled from 'styled-components';
import {
  colorBlueJay,
  colorFireAnt,
  colorHare,
  colorIguana,
  colorOwl,
  colorSeaSponge,
  colorSnow,
  colorSwan,
  colorTurtle,
  colorWalkingFish,
} from '../../constants/colors';

export const OptionAnswerContainer = styled.button`
  border: 2px solid rgb(${(props) => props.defaultBorderColor});
  border-bottom-width: 4px;
  cursor: pointer;
  border-radius: 12px;
  padding: 12px 16px;
  background-color: rgb(${(props) => props.defaultBgc});
  height: ${(props) => props.defaultHeight};
  &:hover {
    background-color: rgb(${(props) => props.defaultHoverBgc});
  }
  &.mouseDown {
    margin-top: 2px;
    border-bottom-width: 2px;
    height: calc(${(props) => props.defaultHeight} - 2px);
  }
  &.selected {
    background-color: rgb(${colorIguana});
    color: rgb(${colorBlueJay});
    border-color: rgb(132 216 255);
  }
  &.right {
    background-color: rgb(${colorSeaSponge});
    color: rgb(${colorOwl});
    border-color: rgb(${colorTurtle});
    cursor: unset;
  }
  &.disabled {
    background-color: rgb(${colorSnow});
    color: #e5e5e5;
    border-color: rgb(${colorSwan});
    cursor: unset;
    transition: all 0.1s ease-in-out;
  }
  &.wrong {
    background-color: rgb(${colorWalkingFish});
    color: rgb(${colorFireAnt});
    border-color: rgb(247, 157, 140);
    cursor: unset;
  }
`;

export const OptionAnswerLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isShowNo ? 'min-content 1fr' : '1fr'};
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
  }
`;

export const OrderAnswer = styled.div`
  align-items: center;
  border: 2px solid rgb(${colorSwan});
  border-radius: 8px;
  color: rgb(${colorHare});
  font-size: 15px;
  font-weight: 700;
  height: 30px;
  display: ${(props) => (props.isShowNo ? 'flex' : 'none')};
  justify-content: center;
  width: 30px;
  @media (max-width: 767px) {
    display: none;
  }
  &.selected {
    color: rgb(${colorBlueJay});
    border-color: rgb(132 216 255);
  }
  &.right {
    color: rgb(${colorOwl});
    border-color: rgb(${colorTurtle});
  }
  &.disabled {
    color: #e5e5e5;
    border-color: rgb(${colorSwan});
    transition: all 0.1s ease-in-out;
  }
  &.wrong {
    color: rgb(${colorFireAnt});
    border-color: rgb(247, 157, 140);
  }
`;

export const AnswerContent = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  position: relative;
  text-align: center;
  text-overflow: ellipsis;
  white-space: normal;
`;
