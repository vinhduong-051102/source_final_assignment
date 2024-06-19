import styled from 'styled-components';
import {
  colorEel,
  colorFireAnt,
  colorFireArtHover,
  colorMacaw,
  colorPolar,
  colorSwan,
} from '../../constants/colors';

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const LoginLayout = styled.div`
  width: 375px;
  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const Title = styled.div`
  font-size: 26px;
  margin: 10px 0 15px;
  text-align: center;
  font-weight: 700;
`;

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: relative;
  text-align: start;
  width: 100%;
  gap: 30px;
`;

export const Input = styled.input`
  background: rgb(${colorPolar});
  border: 2px solid
    ${(props) =>
      props.isError ? `rgb(${colorFireArtHover})` : `rgb(${colorSwan})`};
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  padding: 12px 16px;
  padding-right: 40px;
  font-weight: 500;
  color: ${(props) =>
    props.isError ? `rgb(${colorFireAnt})` : `rgb(${colorEel})`};
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  &:focus-visible {
    outline: none;
    border-color: ${(props) =>
      props.isError ? `rgb(${colorFireArtHover})` : `rgb(${colorSwan})`};
  }
`;

export const ButtonRedirectContainer = styled.div`
  @media (min-width: 426px) {
    position: absolute;
    top: 40px;
    right: 40px;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;

export const TextRedirectContainer = styled.div`
  font-weight: 700;
  text-align: center;
  @media (min-width: 426px) {
    display: none;
  }
`;

export const PasswordIconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
`;

export const PasswordIconImg = styled.img`
  width: 24px;
  height: 24px;
`;
