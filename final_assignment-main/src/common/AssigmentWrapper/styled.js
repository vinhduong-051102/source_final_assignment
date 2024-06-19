import styled from 'styled-components';
import {
  colorOwl,
  colorSeaSponge,
  colorSnow,
  colorSwan,
  colorTreeFlog,
} from '../../constants/colors';
import { processBarHeight } from '../../constants/heights';

export const HeaderContainer = styled.div`
  @media (max-width: 768px) and (min-width: 426px) {
    padding: 40px;
  }

  @media (min-width: 769px) {
    padding: 50px 40px 0;
    margin: 0 auto;
    width: 70%;
  }
`;

export const HeaderLayout = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: min-content 1fr;
  grid-gap: 24px;
`;

export const HeaderCancelBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  transition: filter 0.2s;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
  cursor: pointer;
  display: inline-flex;
  outline: none;
  position: relative;
  touch-action: manipulation;
  transform: translateZ(0);
`;

export const XMarkIcon = styled.img`
  height: 18px;
  width: 18px;
`;

export const HeaderProcessBarContainer = styled.div`
  background-color: rgb(${colorSwan});
  border-radius: calc(${processBarHeight} / 2);
  height: ${processBarHeight};
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  position: relative;
`;

export const HeaderProcessBarConsecutiveText = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  left: 10%;
  letter-spacing: 0.8px;
  position: absolute;
  text-transform: uppercase;
  transform: translateX(-50%);
  white-space: nowrap;
  top: -130%;
  color: rgb(${colorOwl});
  @media (max-width: 768px) {
    top: -170%;
  }
  @media (max-width: 768px) and (min-width: 426px) {
    left: 20%;
  }
`;

export const HeaderProcessBar = styled.div`
  width: ${(props) => props.percentage}%;
  background-color: rgb(${colorOwl});
  height: ${processBarHeight};
  transition: width 0.5s ease-in-out;
  border-radius: calc(${processBarHeight} / 2 - 1px);
`;

export const BodyContainer = styled.div`
  align-content: center;
  display: grid;
  font-size: 19px;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr);
  @media (min-width: 768px) {
    grid-template-columns: min-content;
    grid-template-rows: min-content;
  }
`;

export const AssignmentContainer = styled.div`
  display: grid;
  height: 100vh;
  position: relative;
  @media (max-width: 767px) {
    grid-gap: 24px;
    grid-template-rows: min-content 1fr 190px;
    padding: 35px 16px 0 16px;
    height: calc(100vh - 35px);
  }
  @media (min-width: 768px) {
    grid-gap: 0;
    grid-template-rows: 100px 1fr 140px;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
