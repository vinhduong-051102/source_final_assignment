import styled from 'styled-components';
import { colorSwan } from '../../constants/colors';

export const ChatContainer = styled.div`
  height: calc(100vh - 48px);
  @media (max-width: 425px) {
    height: calc(100vh - 106px);
  }
  width: 100%;
  position: relative;
`;

export const ChatInputContainer = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 0;
  width: 100%;
`;

export const ChatInputLayout = styled.div`
  position: relative;
`;

export const ChatInput = styled.input`
  box-sizing: border-box;
  padding: 16px 14px;
  padding-right: 65px;
  border-radius: 12px;
  border: 2px solid rgb(${colorSwan});
  border-bottom-width: 4px;
  font-size: 18px;
  width: 100%;
  &:focus-visible {
    outline: none;
  }
`;

export const BtnContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  & img {
    width: 20px;
    height: 20px;
  }
`;

export const ChatContentContainer = styled.div`
  max-height: calc(100% - 80px);
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const ChatContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ChatRowContainer = styled.div``;

export const ChatRowLayout = styled.div``;

export const UserNameChat = styled.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  & > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const ContentChat = styled.pre`
  font-weight: 600;
  font-size: 16px;
  max-height: 100%;
  overflow: auto; /* Display scrollbars when content overflows */
  white-space: pre-wrap; /* Wrap long lines of text */
  padding-right: 10px;
`;

export const IntroContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IntroLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IntroText = styled.div`
  font-size: 24px;
  @media (max-width: 425px) {
    font-size: 20px;
  }
  font-weight: 700;
`;
