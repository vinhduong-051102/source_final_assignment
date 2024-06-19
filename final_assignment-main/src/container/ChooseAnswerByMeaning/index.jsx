import character1 from '../../assets/character1.png';
import { AssignmentPrompt, AssigmentContainer } from '../commonStyled';
import {
  AnswerContentLayout,
  AssigmentContentLayout,
  AssigmentMeaningContainer,
  AssigmentMeaningImgContainer,
  AssigmentMeaningLayout,
  AssigmentMeaningTextContainer,
  MeaningText,
  MeaningTextSvgContainer,
} from './styled';
import resourceTalk from '../../utils/svg/resourse_talk.svg';
import OptionAnswer from '../../common/OptionAnswer';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { STATUS } from '../../common/AssigmentWrapper/constants';

const ChooseAnswerByMeaning = forwardRef(
  ({ question, onSetStatus, status }, ref) => {
    const [itemSelected, setItemSelected] = useState(null);

    useImperativeHandle(ref, () => ({
      handleCheck: () => {
        if (itemSelected.key === question.key) {
          onSetStatus(STATUS.right);
        } else {
          onSetStatus(STATUS.wrong);
        }
      },
      handleResetState: () => {
        setItemSelected(null);
      },
    }));

    return (
      <AssigmentContainer>
        <AssignmentPrompt>Chọn nghĩa đúng</AssignmentPrompt>
        <AssigmentContentLayout>
          <AssigmentMeaningContainer>
            <AssigmentMeaningLayout>
              <AssigmentMeaningImgContainer>
                <img src={character1} />
              </AssigmentMeaningImgContainer>
              <AssigmentMeaningTextContainer>
                <MeaningTextSvgContainer>
                  <img src={resourceTalk} />
                </MeaningTextSvgContainer>
                <MeaningText>{question.question}</MeaningText>
              </AssigmentMeaningTextContainer>
            </AssigmentMeaningLayout>
          </AssigmentMeaningContainer>
          <AnswerContentLayout>
            {question.answer.map((a) => {
              return (
                <OptionAnswer
                  content={a.meaning}
                  no={a.no}
                  isSelected={itemSelected && itemSelected.no === a.no}
                  key={a.no}
                  onClick={() => {
                    if (status === STATUS.clean || status === STATUS.wait) {
                      onSetStatus(STATUS.wait);
                      setItemSelected(a);
                    }
                  }}
                />
              );
            })}
          </AnswerContentLayout>
        </AssigmentContentLayout>
      </AssigmentContainer>
    );
  }
);

export default ChooseAnswerByMeaning;
