import {
  AnswerLayout,
  AssigmentContentLayout,
  SpeakerBtnLayout,
  SpeakerIcon,
  SpeakerIconBg,
  SpeakerIconWrapper,
} from './styled';
import { AssignmentPrompt, AssigmentContainer } from '../commonStyled';
import speakerIcon from '../../utils/svg/speaker.svg';
import loading from '../../utils/svg/loading.svg';
import OptionAnswer from '../../common/OptionAnswer';
import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { STATUS } from '../../common/AssigmentWrapper/constants';

const ListenAndChoose = forwardRef(
  ({ questions, onSelect, currentStatus, isLoading, voiceUrl }, ref) => {
    const [itemSelected, setItemSelected] = useState(null);
    const speakerBtnRef = useRef();
    const handleMouseDownOption = () => {
      speakerBtnRef.current.classList.add('mouseDown');
    };
    const handleMouseUpOption = () => {
      speakerBtnRef.current.classList.remove('mouseDown');
    };

    useImperativeHandle(ref, () => ({
      handleCheck: (setConsecutiveCorrectAnswers) => {
        if (itemSelected.key === questions.key) {
          onSelect(STATUS.right);
          setConsecutiveCorrectAnswers((prev) => prev + 1);
        } else {
          onSelect(STATUS.wrong);
          setConsecutiveCorrectAnswers(0);
        }
      },
      handleResetState: () => {
        setItemSelected(null);
      },
    }));

    return (
      <AssigmentContainer>
        <AssignmentPrompt>Bạn nghe được gì?</AssignmentPrompt>
        <AssigmentContentLayout>
          <SpeakerBtnLayout
            onMouseDown={handleMouseDownOption}
            onMouseUp={handleMouseUpOption}
            onMouseOut={handleMouseUpOption}
          >
            <SpeakerIconBg ref={speakerBtnRef} isLoading={isLoading}>
              <SpeakerIconWrapper
                onClick={() => {
                  const audio = new Audio(voiceUrl);
                  audio.play();
                }}
              >
                <SpeakerIcon src={isLoading ? loading : speakerIcon} />
              </SpeakerIconWrapper>
            </SpeakerIconBg>
          </SpeakerBtnLayout>
          <AnswerLayout>
            {questions.answer.map((item, index) => {
              return (
                <OptionAnswer
                  key={index}
                  content={item.vocabulary}
                  no={item.no}
                  onClick={
                    currentStatus === 1 || currentStatus === 2
                      ? () => {}
                      : () => {
                          setItemSelected(item);
                          onSelect(STATUS.wait);
                        }
                  }
                  isSelected={itemSelected && itemSelected.no === item.no}
                />
              );
            })}
          </AnswerLayout>
        </AssigmentContentLayout>
      </AssigmentContainer>
    );
  }
);

export default ListenAndChoose;
