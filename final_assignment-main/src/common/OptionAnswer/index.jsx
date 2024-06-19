import {
  AnswerContent,
  OptionAnswerContainer,
  OptionAnswerLayout,
  OrderAnswer,
} from './styled';

import { useEffect, useRef } from 'react';
import { colorPolar, colorSnow, colorSwan } from '../../constants/colors';

const OptionAnswer = ({
  defaultHoverBgc = `${colorPolar}`,
  defaultBorderColor = `${colorSwan}`,
  defaultBgc = `${colorSnow}`,
  defaultHeight = '100%',
  no,
  content,
  isShowNo = true,
  isSelected = false,
  isDisabled = false,
  isRight = false,
  isWrong = false,
  onClick = () => {},
}) => {
  const btnRef = useRef(null);
  const orderAnswerRef = useRef(null);
  const handleMouseDownOption = () => {
    if (!(isRight || isWrong || isDisabled)) {
      btnRef.current.classList.add('mouseDown');
    }
  };
  const handleMouseUpOption = () => {
    if (!(isRight || isWrong || isDisabled)) {
      btnRef.current.classList.remove('mouseDown');
    }
  };
  useEffect(() => {
    if (isSelected) {
      btnRef.current.classList.add('selected');
      orderAnswerRef.current.classList.add('selected');
    } else {
      btnRef.current.classList.remove('selected');
      if (isShowNo) {
        orderAnswerRef.current.classList.remove('selected');
      }
    }
  }, [isSelected, isShowNo]);

  useEffect(() => {
    if (isRight) {
      btnRef.current.classList.add('right');
      orderAnswerRef.current.classList.add('right');
    } else {
      btnRef.current.classList.remove('right');
      if (isShowNo) {
        orderAnswerRef.current.classList.remove('right');
      }
    }
  }, [isRight, isShowNo]);

  useEffect(() => {
    if (isWrong) {
      btnRef.current.classList.add('wrong');
      orderAnswerRef.current.classList.add('wrong');
    } else {
      btnRef.current.classList.remove('wrong');
      if (isShowNo) {
        orderAnswerRef.current.classList.remove('wrong');
      }
    }
  }, [isWrong, isShowNo]);

  useEffect(() => {
    if (isDisabled) {
      btnRef.current.classList.add('disabled');
      orderAnswerRef.current.classList.add('disabled');
    } else {
      btnRef.current.classList.remove('disabled');
      if (isShowNo) {
        orderAnswerRef.current.classList.remove('disabled');
      }
    }
  }, [isDisabled, isShowNo]);

  return (
    <OptionAnswerContainer
      onClick={() => onClick(no)}
      onMouseDown={handleMouseDownOption}
      onMouseUp={handleMouseUpOption}
      onMouseOut={handleMouseUpOption}
      ref={btnRef}
      defaultHeight={defaultHeight}
      defaultBgc={defaultBgc}
      defaultBorderColor={defaultBorderColor}
      defaultHoverBgc={defaultHoverBgc}
    >
      <OptionAnswerLayout isShowNo={isShowNo}>
        <OrderAnswer isShowNo={isShowNo} ref={orderAnswerRef}>
          {no}
        </OrderAnswer>
        <AnswerContent>{content}</AnswerContent>
      </OptionAnswerLayout>
    </OptionAnswerContainer>
  );
};

export default OptionAnswer;
