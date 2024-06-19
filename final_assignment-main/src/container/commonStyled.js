import styled from 'styled-components';

export const AssigmentContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-rows: min-content minmax(0, 1fr);
  overflow-x: hidden;
  overflow-y: auto;
  @media (min-width: 768px) {
    min-height: 450px;
    overflow: visible;
    width: 600px;
  }
`;

export const AssignmentPrompt = styled.div`
  font-size: 25px;
  line-height: 1.25;
  margin: 0;
  text-align: left;
  width: 100%;
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;
