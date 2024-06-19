import styled from 'styled-components';
import { colorEel } from '../../constants/colors';

export const ErrorPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px;
`;

export const ErrorPageLayout = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
`;

export const Text = styled.div`
  color: rgb(${colorEel});
  font-size: 25px;
  font-weight: 700;
  line-height: 34px;
`;

export const Img = styled.img`
  width: 120px;
  height: 120px;
`;
