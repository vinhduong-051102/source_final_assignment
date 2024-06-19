export const STATUS = {
  clean: 0,
  right: 1,
  wrong: 2,
  wait: 3,
};

export const KEY = 'assigment';

export const ACTION_START = `${KEY}/actionStart`;

export const ACTION_END = `${KEY}/actionEnd`;

export const RESET_REDUX = `${KEY}/resetRedux`;

export const GET_LIST_WORD_ACTION = `${KEY}/getListWord`;

export const GET_LIST_WORD_SUCCESS = `${KEY}/getListWordSuccess`;

export const GET_QUESTION_ACTION = `${KEY}/getQuestion`;

export const GET_QUESTION_SUCCESS = `${KEY}/getQuestionSuccess`;

export const GET_VOICE_ACTION = `${KEY}/getVoice`;

export const GET_VOICE_SUCCESS = `${KEY}/getVoiceSuccess`;

export const RECORD_ACTION = `${KEY}/record`;

export const RECORD_SUCCESS = `${KEY}/recordSuccess`;

export const GET_SPEAK_SCORE_ACTION = `${KEY}/getSpeakScore`;

export const GET_SPEAK_SCORE_SUCCESS = `${KEY}/getSpeakScoreSuccess`;

export const MARK_COMPLETE_ACTION = `${KEY}/markComplete`;

export const MARK_COMPLETE_SUCCESS = `${KEY}/markCompleteSuccess`;

export const CREATE_RESULT_ACTION = `${KEY}/createResult`;

export const CREATE_RESULT_SUCCESS = `${KEY}/createResultSuccess`;
