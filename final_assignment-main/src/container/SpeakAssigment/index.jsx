import { AssigmentContainer, AssignmentPrompt } from '../commonStyled';
import {
  AssigmentContentLayout,
  AssigmentQuestionContainer,
  AssigmentQuestionImgContainer,
  AssigmentQuestionLayout,
  AssigmentQuestionTextContainer,
  BtnCheckContainer,
  Icon,
  QuestionSpeakerBtn,
  QuestionSpeakerIconContainer,
  QuestionText,
  QuestionTextSvgContainer,
  SpeakerImg,
} from './styled';
import character5 from '../../assets/character5.png';
import resourceTalk from '../../utils/svg/resourse_talk.svg';
import speakerSvg from '../../utils/svg/speaker_question.svg';
import OptionAnswer from '../../common/OptionAnswer';
import { forwardRef, useImperativeHandle, useState } from 'react';
import loading from '../../utils/svg/loading.svg';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useDispatch } from 'react-redux';
import { getSpeakScore } from '../../common/AssigmentWrapper/actions';

const SpeakAssigment = forwardRef(
  (
    { question, isLoading, voiceUrl, onRecord, audioText, onSetStatus },
    ref
  ) => {
    const dispatch = useDispatch();
    useImperativeHandle(ref, () => ({
      handleCheck: () => {
        if (audioText) {
          dispatch(getSpeakScore({ answer: question.answer, user: audioText }));
        }
      },
    }));

    return (
      <AssigmentContainer>
        <AssignmentPrompt>Đọc câu này</AssignmentPrompt>
        <AssigmentContentLayout>
          <AssigmentQuestionContainer>
            <AssigmentQuestionLayout>
              <AssigmentQuestionImgContainer>
                <img src={character5} />
              </AssigmentQuestionImgContainer>
              <AssigmentQuestionTextContainer>
                <QuestionTextSvgContainer>
                  <img src={resourceTalk} />
                </QuestionTextSvgContainer>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <QuestionSpeakerIconContainer>
                    <QuestionSpeakerBtn
                      onClick={() => {
                        const audio = new Audio(voiceUrl);
                        audio.play();
                      }}
                    >
                      <SpeakerImg src={isLoading ? loading : speakerSvg} />
                    </QuestionSpeakerBtn>
                  </QuestionSpeakerIconContainer>
                  <QuestionText>{question.question}</QuestionText>
                </div>
              </AssigmentQuestionTextContainer>
            </AssigmentQuestionLayout>
          </AssigmentQuestionContainer>
          <OptionAnswer
            content={
              <BtnCheckContainer>
                <AudioRecorder
                  showVisualizer
                  onRecordingComplete={onRecord}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                />
              </BtnCheckContainer>
            }
            isShowNo={false}
          />
        </AssigmentContentLayout>
      </AssigmentContainer>
    );
  }
);

export default SpeakAssigment;
