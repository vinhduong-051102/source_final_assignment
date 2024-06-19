import styled from 'styled-components';
import {
  colorEel,
  colorFireAnt,
  colorFireArtHover,
  colorHare,
  colorSwan,
} from '../../constants/colors';

export const CreateLessonContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 48px);
  padding-top: 50px;
  @media (max-width: 425px) {
    height: calc(100vh - 106px);
    padding-top: 70px;
  }
  width: 100%;
  position: relative;
  //overflow: auto;
`;

export const CreateLessonLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

export const CreateLessonHeader = styled.div`
  position: absolute;
  top: 0;
  @media (max-width: 425px) {
    top: 20px;
  }
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

export const CreateTitleContainer = styled.div`
  margin-top: 30px;
`;

export const CreateTitleLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const InputTitle = styled.input`
  box-sizing: border-box;
  padding: 16px 14px;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.isError ? `rgb(${colorFireArtHover})` : `rgb(${colorSwan})`};
  border-bottom-width: 4px;
  font-size: 18px;
  width: 100%;
  color: ${(props) =>
    props.isError ? `rgb(${colorFireAnt})` : `rgb(${colorEel})`};

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: ${(props) =>
      props.isError ? `rgb(${colorFireAnt})` : `rgb(${colorEel})`};
  }
`;

export const TextareaDescribe = styled.textarea`
  box-sizing: border-box;
  padding: 16px 14px;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.isError ? `rgb(${colorFireArtHover})` : `rgb(${colorSwan})`};
  border-bottom-width: 4px;
  font-size: 18px;
  width: 100%;
  resize: none;
  height: 120px;
  color: ${(props) =>
    props.isError ? `rgb(${colorFireAnt})` : `rgb(${colorEel})`};

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: ${(props) =>
      props.isError ? `rgb(${colorFireAnt})` : `rgb(${colorEel})`};
  }
`;

export const ListVocabularyContainer = styled.div`
  overflow: auto;
`;

export const ListVocabularyLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const VocabularyContainer = styled.div``;

export const VocabularyLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VocabularyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  padding: 14px;
  border: 2px solid rgb(${colorSwan});
  border-radius: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: transparent;
`;

export const VocabularyBody = styled.div`
  padding: 14px;
  border: 2px solid rgb(${colorSwan});
  border-radius: 12px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-width: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

export const SuggestListContainer = styled.div`
  position: absolute;
  background-color: rgb(${colorSwan});
  width: 100%;
  border-radius: 12px;
  margin-top: 10px;
`;

export const SuggestRow = styled.div`
  padding: 4px 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  &:hover {
    color: rgb(${colorHare});
  }
`;
