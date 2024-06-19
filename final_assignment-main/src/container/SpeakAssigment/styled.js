import styled from 'styled-components';
import {
  colorEel,
  colorMacaw,
  colorSnow,
  colorSwan,
} from '../../constants/colors';

export const AssigmentContentLayout = styled.div`
  display: grid;
  text-align: initial;
  grid-template-rows: min-content 1fr;
  @media (min-width: 768px) {
    align-content: center;
    grid-template-rows: none;
  }
`;

export const AssigmentQuestionContainer = styled.div`
  line-height: 1.4;
  padding-left: 16px;
  @media (min-width: 768px) {
    margin-top: -24px;
  }
`;

export const AssigmentQuestionLayout = styled.div`
  align-items: center;
  display: flex;
`;

export const AssigmentQuestionImgContainer = styled.div`
  align-self: flex-end;
  aspect-ratio: 118 / 175;
  display: flex;
  flex-shrink: 0;
  line-height: 0;
  max-width: 118px;
  width: 30%;
`;

export const AssigmentQuestionTextContainer = styled.div`
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

export const QuestionTextSvgContainer = styled.div`
  position: absolute;
  top: Min(Max(calc(38.5px - 18px), 12px), calc(100% - 32px));
  left: -18px;
`;

export const QuestionSpeakerIconContainer = styled.div`
  align-items: center;
  display: inline-flex;
  margin-inline-end: 8px;
  vertical-align: top;
`;

export const QuestionSpeakerBtn = styled.button`
  background-color: transparent;
  border: 0;
  border-radius: 0;
  line-height: 0;
  padding: 0;
`;

export const SpeakerImg = styled.img`
  height: 22px;
  width: 29px;
`;

export const QuestionText = styled.div`
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

export const BtnCheckContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  color: rgb(${colorMacaw});
  height: 40px;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
`;

export const Icon = styled.img`
  height: 25px;
`;
