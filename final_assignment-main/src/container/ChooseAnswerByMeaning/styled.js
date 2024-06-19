import styled from 'styled-components';
import { colorEel, colorSnow, colorSwan } from '../../constants/colors';

export const AssigmentContentLayout = styled.div`
  display: grid;
  text-align: initial;
  align-content: start;
  grid-template-rows: min-content min-content;
  @media (min-width: 768px) {
    grid-template-rows: min-content 1fr;
  }
`;

export const AssigmentMeaningContainer = styled.div`
  line-height: 1.4;
  padding-left: 16px;
  margin-bottom: -4px;
  margin-top: -16px;
  @media (min-width: 768px) {
    margin-top: -24px;
  }
`;

export const AssigmentMeaningLayout = styled.div`
  align-items: center;
  display: flex;
`;

export const AssigmentMeaningImgContainer = styled.div`
  align-self: flex-end;
  aspect-ratio: 118 / 175;
  display: flex;
  flex-shrink: 0;
  line-height: 0;
  max-width: 118px;
  width: 30%;
`;

export const AssigmentMeaningTextContainer = styled.div`
  align-items: end;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
  position: relative;
  background: rgb(${colorSnow});
  border: 2px solid rgb(${colorSwan});
  border-radius: 12px;
  color: rgb(${colorEel});
  font-weight: 500;
  letter-spacing: 0;
  line-height: calc(1.75rem + 4px);
  padding: 8px 14px 12px;
  text-transform: none;
`;

export const MeaningTextSvgContainer = styled.div`
  position: absolute;
  top: Min(Max(calc(38.5px - 18px), 12px), calc(100% - 32px));
  left: -18px;
`;

export const MeaningText = styled.div`
  max-width: 350px;
  word-wrap: break-word;
  max-height: 160px;
  overflow: scroll;
  @media (min-width: 768px) {
    overflow: hidden;
  }
  @media (max-width: 767px) and (min-width: 425px) {
    overflow: hidden;
    max-width: 200px;
  }
  @media (max-width: 424px) and (min-width: 321px) {
    max-width: 170px;
  }
  @media (max-width: 320px) {
    max-width: 120px;
    max-height: 100px;
  }
`;

export const AnswerContentLayout = styled.div`
  align-self: start;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  display: grid;
`;
