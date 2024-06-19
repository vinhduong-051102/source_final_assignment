import styled from 'styled-components';

export const AssigmentContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AssigmentContentLayout = styled.div`
  display: grid;
  text-align: initial;
  grid-gap: 16px 20px;
  grid-auto-flow: column;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(5, 76px);
  justify-content: center;
  max-height: 100%;
  @media (min-width: 700px) {
    grid-gap: 10px 30px;
    grid-template-columns: repeat(2, 255px);
    grid-template-rows: repeat(5, 1fr);
  }
`;
