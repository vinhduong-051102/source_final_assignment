import styled from 'styled-components';
import {
  colorEel,
  colorHare,
  colorSnow,
  colorSwan,
} from '../../constants/colors';

export const AssigmentContentLayout = styled.div`
  display: grid;
  text-align: initial;
  align-content: start;
  grid-template-rows: min-content min-content;
  @media (min-width: 768px) {
    grid-template-rows: min-content 1fr;
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

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 87px;
  align-self: start;
  @media (min-width: 768px) {
    min-height: 170px;
  }
`;

export const AnswerLayoutPC = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: grid;
    grid-auto-rows: 1fr;
    grid-row-gap: 32px;
    border-top: 2px solid rgb(${colorSwan});
  }
`;

export const AnswerInputContainer = styled.div``;

export const AnswerInputRow = styled.div`
  border-bottom: 2px solid rgb(${colorSwan});
  width: 100%;
  height: 80px;
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const AnswerTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AnswerTagLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;

export const AnswerLayoutOther = styled.div`
  display: none;
  @media (max-height: 768px) {
    display: block;
  }
`;

export const AnswerTextarea = styled.textarea`
  width: calc(100% - 36px);
  height: 170px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid rgb(${colorSwan});
  font-size: 19px;
  &::placeholder {
    color: rgb(${colorSwan});
  }
`;

export const OptionAnswer = styled.div`
  border: 2px solid rgb(${colorSwan});
  border-bottom-width: 4px;
  cursor: pointer;
  border-radius: 12px;
  padding: 8px 12px;
  background-color: rgb(${colorSnow});
  height: 30px;
`;
