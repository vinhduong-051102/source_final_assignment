import styled from 'styled-components';

export const LearnContainer = styled.div`
  height: calc(100vh - 48px);
  width: 100%;
  & * {
    box-sizing: border-box;
  }
`;

export const LearnLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 50%;
  gap: 20px;
`;

export const LearnHeader = styled.div`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const LearnSubHeader = styled.div `
  font-weight: 700;
  font-size: 18px;

  margin-bottom: 20px;
`

export const ResultDiagramLayout = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 10px;
`

export const DiagramLayout = styled.div `
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TargetDiagramLayout = styled.div `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border: 1px solid #cccccc;
  padding: 20px;
  border-radius: 10px;
`

export const LearnBody = styled.div``;

export const LessonMenuItem = styled.div`
  cursor: pointer;
  & {
    position: relative;
    margin-top: 24px;
    color: #ffffff;
    height: 65px;
    width: 70px;
    z-index: 0;
  }
  &:after,
  &:before {
    content: '';
    left: 0;
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  &:before {
    height: 8px;
    top: 28.5px;
  }

  &:after {
    background: rgb(88, 204, 2);
    //background: rgb( 229,229,229 );
    border-radius: 50% / 50%;
    //box-shadow: 0 8px 0 rgb(0,0,0, .2), 0 8px 0 rgb( 229,229,229 );
    box-shadow:
      0 8px 0 rgb(0, 0, 0, 0.2),
      0 8px 0 rgb(88, 204, 2);
    height: 57px;
    top: 0;
  }
  & > span {
    left: 6px;
    position: absolute;
    top: 5px;
  }
  & > img {
    height: 34px;
    left: 14px;
    position: absolute;
    top: 11.5px;
    width: 42px;
  }
  &.disabled:after {
    background: rgb(229, 229, 229);
    box-shadow:
      0 8px 0 rgb(0, 0, 0, 0.2),
      0 8px 0 rgb(229, 229, 229);
  }
  &.disabled > span {
    display: none;
  }
`;

export const ListLesson = styled.div`
  padding: 0 10px;
`;

export const SuggestLesson = styled.div``;

export const LessonContainer = styled.div`
  margin-bottom: 20px;
`;

export const LessonLayout = styled.div``;

export const LessonHeader = styled.div`
  background-color: rgb(88, 204, 2);
  border-radius: 13px;
  padding: 16px;
  width: 100%;
`;

export const LessonTittle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  opacity: 0.7;
  color: #ffffff;
`;

export const LessonDescription = styled.div`
  font-size: 22px;
  line-height: 28px;
  overflow-wrap: break-word;
  font-weight: 700;
  color: #ffffff;
`;

export const LessonBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
