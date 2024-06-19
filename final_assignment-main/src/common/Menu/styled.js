import styled from 'styled-components';
import {
  colorIguana,
  colorMacaw,
  colorPolar,
  colorSnow,
  colorSwan,
  colorWolf,
} from '../../constants/colors';
import { NavLink } from 'react-router-dom';

export const MenuContainer = styled.div`
  height: 100vh;
`;
export const SidebarContainer = styled.div`
  position: fixed;
  background-color: rgb(${colorSnow});
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 100;
  @media (min-width: 426px) {
    height: 100vh;
    border-right: 2px solid rgb(${colorSwan});
  }
  @media (min-width: 769px) {
    width: 250px;
  }
  @media (max-width: 768px) and (min-width: 426px) {
    width: 100px;
  }
  @media (max-width: 425px) {
    border-top: 2px solid rgb(${colorSwan});
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    height: 90px;
    bottom: 0;
  }
`;

export const LogoContainer = styled.div`
  height: 30px;
  padding: 32px 0 30px 16px;
  @media (max-width: 768px) and (min-width: 426px) {
    height: 39px;
    padding: 36px 0 25px 10px;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;

export const LogoMobile = styled.img`
  height: 40px;
  width: 40px;
  @media (min-width: 769px) {
    display: none;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;

export const LogoPC = styled.img`
  height: 30px;
  width: 128px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ListMenuItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;

export const MenuItemLayout = styled(NavLink)`
  height: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px 8px;
  color: rgb(${colorWolf});
  border-radius: 12px;
  border: 2px solid transparent;
  &:hover {
    color: rgb(${colorWolf});
    background-color: rgb(${colorPolar});
  }
  &.active {
    color: rgb(${colorMacaw});
    background-color: rgb(${colorIguana});
    border: 2px solid rgb(132, 216, 255);
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 425px) {
    justify-content: center;
    padding: 4px;
  }
`;

export const Logout = styled.div`
  height: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 4px 8px;
  color: rgb(${colorWolf});
  border-radius: 12px;
  border: 2px solid transparent;
  &:hover {
    color: rgb(${colorWolf});
    background-color: rgb(${colorPolar});
  }
  &.active {
    color: rgb(${colorMacaw});
    background-color: rgb(${colorIguana});
    border: 2px solid rgb(132, 216, 255);
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 425px) {
    justify-content: center;
    padding: 4px;
  }
`;

export const MenuItemIcon = styled.img`
  margin-left: 6px;
  height: 32px;
  padding-right: 0;
  transition: filter 0.2s;
  width: 32px;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin: 0;
  }
  @media (max-width: 425px) {
    height: 50px;
    width: 50px;
  }
`;

export const MenuItemText = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 60%;
  justify-content: center;
  padding: 24px 0;
  @media (min-width: 769px) {
    padding-left: 250px;
  }
  @media (max-width: 768px) and (min-width: 426px) {
    padding-left: 100px;
  }
  @media (max-width: 425px) {
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px 106px;
  }
`;
