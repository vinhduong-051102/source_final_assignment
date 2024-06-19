import {
  BtnContainer,
  ChatContainer,
  ChatContentContainer,
  ChatContentLayout,
  ChatInput,
  ChatInputContainer,
  ChatInputLayout,
  ChatRowContainer,
  ChatRowLayout,
  ContentChat,
  IntroContainer,
  IntroLayout,
  IntroText,
  UserNameChat,
} from './styled';
import OptionAnswer from '../../common/OptionAnswer';
import sendIcon from '../../utils/svg/send_icon.svg';
import { assistantIcon, logoIcon, userAvatar } from '../../constants/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './chatSlice';
import * as actions from './actions';
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  // Danh sách các selector
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.selectIsLoading);
  const history = useSelector(selectors.selectHistory);

  // Danh sách các state
  // State quản lý câu hỏi
  const [question, setQuestion] = useState('');
  // State lưu câu hỏi và câu trả lời khi chờ loading
  const [loadingQA, setLoadingQA] = useState('');

  // Danh sách các ref
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputQuestion = (e) => {
    setQuestion(e.target.value);
  };

  // Hàm xử lý kết quả và gọi API
  const handleSubmit = () => {
    if (question) {
      const inputEl = inputRef.current;
      // focus vào ô input
      if (inputEl) {
        inputEl.focus();
      }
      // Tạo ra đoạn chat chờ
      setLoadingQA(question);
      // Xoá nội dung chat cũ
      setQuestion('');
      // Gọi API
      dispatch(actions.chat(question));
    } else {
      alert('Vui lòng nhập câu hỏi');
    }
  };

  // Hàm xử lý khi ấn Enter
  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Gọi API lấy danh sách chat
  useEffect(() => {
    dispatch(actions.getListHistory());
  }, [dispatch]);

  // Scroll đến đoạn chat mới nhất
  useEffect(() => {
    const htmlEl = chatContainerRef.current;
    if (htmlEl) {
      htmlEl.scrollTop = htmlEl.scrollHeight;
    }
  }, [history, isLoading]);

  return (
    <ChatContainer>
      <ChatContentContainer ref={chatContainerRef}>
        {history.length === 0 ? (
          <IntroContainer>
            <IntroLayout>
              <img src={logoIcon} width={70} />
              <IntroText>Tôi có thể giúp gì cho bạn ?</IntroText>
            </IntroLayout>
          </IntroContainer>
        ) : (
          <ChatContentLayout ref={chatContainerRef}>
            {history.map((item, index) => {
              if (item.role === 'user') {
                return (
                  <ChatRowContainer key={index} className="row">
                    <ChatRowLayout>
                      <UserNameChat>
                        <img src={userAvatar} />
                        <span>Bạn</span>
                      </UserNameChat>
                      <ContentChat>{item.content}</ContentChat>
                    </ChatRowLayout>
                  </ChatRowContainer>
                );
              } else {
                return (
                  <ChatRowContainer key={index} className="row">
                    <ChatRowLayout>
                      <UserNameChat>
                        <img src={assistantIcon} />
                        <span>Trợ lý</span>
                      </UserNameChat>
                      <ContentChat>{item.content}</ContentChat>
                    </ChatRowLayout>
                  </ChatRowContainer>
                );
              }
            })}
            {isLoading && (
              <>
                <ChatRowContainer className="row">
                  <ChatRowLayout>
                    <UserNameChat>
                      <img src={userAvatar} />
                      <span>Bạn</span>
                    </UserNameChat>
                    <ContentChat>{loadingQA}</ContentChat>
                  </ChatRowLayout>
                </ChatRowContainer>
                <ChatRowContainer className="row">
                  <ChatRowLayout>
                    <UserNameChat>
                      <img src={assistantIcon} />
                      <span>Trợ lý</span>
                    </UserNameChat>
                    <ContentChat>
                      Câu trả lời của bạn sẽ có trong vài giây ^^
                    </ContentChat>
                  </ChatRowLayout>
                </ChatRowContainer>
              </>
            )}
          </ChatContentLayout>
        )}
      </ChatContentContainer>
      <ChatInputContainer>
        <ChatInputLayout>
          <ChatInput
            ref={inputRef}
            placeholder="Câu hỏi của bạn là gì ...."
            onChange={handleInputQuestion}
            onKeyPress={handlePressEnter}
            value={question}
          />
          <BtnContainer>
            <OptionAnswer
              no={1}
              isShowNo={false}
              content={<img src={sendIcon} />}
              onClick={handleSubmit}
            />
          </BtnContainer>
        </ChatInputLayout>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;
