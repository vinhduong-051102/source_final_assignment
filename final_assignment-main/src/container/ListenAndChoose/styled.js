import styled from 'styled-components';
import { colorMacaw, colorSwan } from '../../constants/colors';

export const AssigmentContentLayout = styled.div`
  display: grid;
  text-align: center;
  grid-template-rows: min-content 1fr;
  gap: 16px;
  @media (min-width: 768px) {
    align-self: center;
    align-items: center;
  }
`;

export const SpeakerBtnLayout = styled.div`
  margin: 0 auto;
`;

export const SpeakerIconBg = styled.button`
  background-color: ${(props) =>
    props.isLoading ? `rgb(${colorSwan})` : `rgb(${colorMacaw})`};
  border-color: transparent;
  border-width: ${(props) => (props.isLoading ? '0px' : '0 0 4px')};
  border-bottom-color: ${(props) =>
    props.isLoading ? 'transparent' : '#1799d6'};
  border-radius: 25%;
  height: 140px;
  width: 140px;
  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
  &:hover {
    background-color: ${(props) =>
      props.isLoading ? `rgb(${colorSwan})` : `#1dbefd`};
  }
  &.mouseDown {
    border-bottom-width: 0;
    height: 136px;
    margin-top: 4px;
    @media (max-width: 767px) {
      height: 96px;
    }
  }
`;

export const SpeakerIconWrapper = styled.span`
  height: 50%;
  display: inline-block;
`;

export const SpeakerIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const AnswerLayout = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    align-self: center;
  }
`;
