import {
  BtnContentLayout,
  CharacterContainer,
  CharacterLayout,
  ListVowelBtnLayout,
  ListVowelContainer,
  ListVowelLayout,
  ListVowelTitle,
  MainTitle,
  SubTitle,
  Symbol,
  TitleContainer,
  TitleContentContainer,
  TitleLayout,
  Word,
  PronuceContainer,
  PronuceLayout,
  PronunceHeader,
  PronuceBody,
} from './styled';
import { AudioRecorder } from 'react-audio-voice-recorder';
import OptionAnswer from '../../common/OptionAnswer';
import { Modal, Progress } from 'antd';
import { assistantIcon } from '../../constants/icons';
import speakerSvg from '../../utils/svg/speaker_question.svg';
import asia from '../../assets/audio/asia.m4a';
import back from '../../assets/audio/back.m4a';
import bed from '../../assets/audio/bed.m4a';
import boo from '../../assets/audio/boo.m4a';
import book from '../../assets/audio/book.m4a';
import boy from '../../assets/audio/boy.m4a';
import buzz from '../../assets/audio/buzz.m4a';
import cage from '../../assets/audio/cage.m4a';
import chicken from '../../assets/audio/chicken.m4a';
import cub from '../../assets/audio/cub.m4a';
import deep from '../../assets/audio/deep.m4a';
import doAudio from '../../assets/audio/do.m4a';
import dove from '../../assets/audio/dove.m4a';
import fish from '../../assets/audio/fish.m4a';
import five from '../../assets/audio/five.m4a';
import food from '../../assets/audio/food.m4a';
import foot from '../../assets/audio/foot.m4a';
import free from '../../assets/audio/free.m4a';
import game from '../../assets/audio/game.m4a';
import get from '../../assets/audio/get.m4a';
import glass from '../../assets/audio/glass.m4a';
import graph from '../../assets/audio/graph.m4a';
import jazz from '../../assets/audio/jazz.m4a';
import key from '../../assets/audio/key.m4a';
import leave from '../../assets/audio/leave.m4a';
import live from '../../assets/audio/live.m4a';
import love from '../../assets/audio/love.m4a';
import mop from '../../assets/audio/mop.m4a';
import much from '../../assets/audio/much.m4a';
import not from '../../assets/audio/mop.m4a';
import pen from '../../assets/audio/pen.m4a';
import run from '../../assets/audio/run.m4a';
import sad from '../../assets/audio/sad.m4a';
import said from '../../assets/audio/said.m4a';
import she from '../../assets/audio/she.m4a';
import sick from '../../assets/audio/sick.m4a';
import skill from '../../assets/audio/skill.m4a';
import south from '../../assets/audio/south.m4a';
import sun from '../../assets/audio/sun.m4a';
import tea from '../../assets/audio/tea.m4a';
import thin from '../../assets/audio/thin.m4a';
import thisAudio from '../../assets/audio/this.m4a';
import unite from '../../assets/audio/unite.m4a';
import usual from '../../assets/audio/usual.m4a';
import what from '../../assets/audio/what.m4a';
import where from '../../assets/audio/where.m4a';
import who from '../../assets/audio/who.m4a';
import whole from '../../assets/audio/thin.m4a';
import withAudio from '../../assets/audio/with.m4a';
import you from '../../assets/audio/you.m4a';
import zero from '../../assets/audio/zero.m4a';
import autumn from '../../assets/audio/autumn.m4a';
import bird from '../../assets/audio/bird.m4a';
import sing from '../../assets/audio/sing.m4a';
import tradition from '../../assets/audio/tradition.m4a';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { record, getSpeakScore, recordSuccess, getSpeakScoreSuccess } from '../../common/AssigmentWrapper/actions';
import {
  selectIsLoading,
  selectAudioText,
  selectScore,
} from '../../common/AssigmentWrapper/assigmentSlice';

const Character = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const audioText = useSelector(selectAudioText);
  const score = useSelector(selectScore);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [totalVowl, setTotalVowl] = useState(0);
  const [currIndexVowl, setCurrIndexVowl] = useState(null);
  const arr = {
    ɪ: [
      {
        audio: skill,
        ipa: '/skɪl/',
        vocabulary: 'skill',
        meaning: 'kỹ năng',
      },
      {
        audio: live,
        ipa: '/lɪv/',
        vocabulary: 'live',
        meaning: 'sống',
      },
      {
        audio: fish,
        ipa: '/fɪʃ/',
        vocabulary: 'fish',
        meaning: 'cá',
      },
      {
        audio: sick,
        ipa: '/sɪk/',
        vocabulary: 'sick',
        meaning: 'ốm',
      },
    ],
    æ: [
      {
        audio: jazz,
        ipa: '/dʒæz/',
        vocabulary: 'jazz',
        meaning: 'nhạc jazz',
      },
      {
        audio: back,
        ipa: '/bæk/',
        vocabulary: 'back',
        meaning: 'quay lại',
      },
      {
        audio: sad,
        ipa: '/sæd/',
        vocabulary: 'sad',
        meaning: 'buồn',
      },
      {
        audio: glass,
        ipa: '/ɡlæs/',
        vocabulary: 'glass',
        meaning: 'cốc thủy tinh',
      },
    ],
    ʊ: [
      {
        audio: book,
        ipa: '/bʊk/',
        vocabulary: 'book',
        meaning: 'sách',
      },
    ],
    uː: [
      {
        audio: food,
        ipa: '/fuːd/',
        vocabulary: 'food',
        meaning: 'thức ăn',
      },
      {
        audio: you,
        ipa: '/juː/',
        vocabulary: 'you',
        meaning: 'bạn',
      },
    ],
    ɒ: [
      {
        audio: not,
        ipa: '/nɒt/',
        vocabulary: 'not',
        meaning: 'không',
      },
    ],
    eɪ: [
      {
        audio: game,
        ipa: '/ɡeɪm/',
        vocabulary: 'game',
        meaning: 'trò chơi',
      },
      {
        audio: cage,
        ipa: '/keɪdʒ/',
        vocabulary: 'cage',
        meaning: 'lồng',
      },
    ],
    ɔɪ: [
      {
        audio: boy,
        ipa: '/bɔɪ/',
        vocabulary: 'boy',
        meaning: 'con trai',
      },
    ],
    aʊ: [
      {
        audio: south,
        ipa: '/saʊθ/',
        vocabulary: 'south',
        meaning: 'phía nam',
      },
    ],
    aɪ: [
      {
        audio: five,
        ipa: '/faɪv/',
        vocabulary: 'five',
        meaning: 'số năm',
      },
    ],
    oʊ: [
      {
        audio: zero,
        ipa: '/ˈzɪə.roʊ/',
        vocabulary: 'zero',
        meaning: 'số không',
      },
    ],
    iː: [
      {
        audio: leave,
        ipa: '/liːv/',
        vocabulary: 'leave',
        meaning: 'rời đi',
      },
      {
        audio: she,
        ipa: '/ʃiː/',
        vocabulary: 'she',
        meaning: 'cô ấy',
      },
      {
        audio: key,
        ipa: '/kiː/',
        vocabulary: 'key',
        meaning: 'chìa khóa',
      },
      {
        audio: tea,
        ipa: '/tiː/',
        vocabulary: 'tea',
        meaning: 'trà',
      },
    ],
    e: [
      {
        audio: said,
        ipa: '/sed/',
        vocabulary: 'said',
        meaning: 'đã nói',
      },
      {
        audio: pen,
        ipa: '/pen/',
        vocabulary: 'pen',
        meaning: 'bút',
      },
      {
        audio: bed,
        ipa: '/bed/',
        vocabulary: 'bed',
        meaning: 'giường',
      },
    ],
    ʌ: [
      {
        audio: much,
        ipa: '/mʌtʃ/',
        vocabulary: 'much',
        meaning: 'nhiều',
      },
    ],
    ə: [
      {
        audio: tradition, // aaaaa
        ipa: '/trəˈdɪʃ.ən/',
        vocabulary: 'tradition',
        meaning: 'tryền thống',
      },
    ],
    ɔː: [
      {
        audio: autumn, // aaaaa
        ipa: '/ˈɔː.təm/',
        vocabulary: 'autumn',
        meaning: 'mùa thu',
      },
    ],
    ɜː: [
      {
        audio: bird, // aaaaa
        ipa: '/bɜːd/',
        vocabulary: 'bird',
        meaning: 'chim',
      },
    ],
    ʃ: [
      {
        audio: she,
        ipa: '/ʃiː/',
        vocabulary: 'she',
        meaning: 'cô ấy',
      },
    ],
    ʒ: [
      {
        audio: usual,
        ipa: '/ˈjuː.ʒu.əl/',
        vocabulary: 'usual',
        meaning: 'thông thường',
      },
    ],
    tʃ: [
      {
        audio: chicken,
        ipa: '/ˈtʃɪk.ɪn/',
        vocabulary: 'chicken',
        meaning: 'gà',
      },
    ],
    dʒ: [
      {
        audio: jazz,
        ipa: '/dʒæz/',
        vocabulary: 'jazz',
        meaning: 'nhạc jazz',
      },
    ],
    θ: [
      {
        audio: thin,
        ipa: '/θɪn/',
        vocabulary: 'thin',
        meaning: 'mỏng',
      },
    ],
    ð: [
      {
        audio: thisAudio,
        ipa: '/ðɪs/',
        vocabulary: 'this',
        meaning: 'cái này',
      },
    ],
    ŋ: [
      {
        audio: sing, // aaaa
        ipa: '/sɪŋ/',
        vocabulary: 'sing',
        meaning: 'hát',
      },
    ],
    h: [
      {
        audio: whole,
        ipa: '/hoʊl/',
        vocabulary: 'whole',
        meaning: 'toàn bộ',
      },
    ],
    w: [
      {
        audio: who,
        ipa: '/huː/',
        vocabulary: 'who',
        meaning: 'ai',
      },
    ],
    j: [
      {
        audio: you,
        ipa: '/juː/',
        vocabulary: 'you',
        meaning: 'bạn',
      },
    ],
    r: [
      {
        audio: run,
        ipa: '/rʌn/',
        vocabulary: 'run',
        meaning: 'chạy',
      },
    ],
    l: [
      {
        audio: live,
        ipa: '/lɪv/',
        vocabulary: 'live',
        meaning: 'sống',
      },
    ],
    m: [
      {
        audio: mop,
        ipa: '/mɒp/',
        vocabulary: 'mop',
        meaning: 'cây lau nhà',
      },
    ],
    n: [
      {
        audio: not,
        ipa: '/nɒt/',
        vocabulary: 'not',
        meaning: 'không',
      },
    ],
    p: [
      {
        audio: pen,
        ipa: '/pen/',
        vocabulary: 'pen',
        meaning: 'bút',
      },
    ],
    b: [
      {
        audio: boy,
        ipa: '/bɔɪ/',
        vocabulary: 'boy',
        meaning: 'con trai',
      },
    ],
    t: [
      {
        audio: tea,
        ipa: '/tiː/',
        vocabulary: 'tea',
        meaning: 'trà',
      },
    ],
    d: [
      {
        audio: doAudio,
        ipa: '/duː/',
        vocabulary: 'do',
        meaning: 'làm',
      },
    ],
    k: [
      {
        audio: key,
        ipa: '/kiː/',
        vocabulary: 'key',
        meaning: 'chìa khóa',
      },
    ],
    ɡ: [
      {
        audio: get,
        ipa: '/ɡet/',
        vocabulary: 'get',
        meaning: 'lấy',
      },
    ],
    f: [
      {
        audio: fish,
        ipa: '/fɪʃ/',
        vocabulary: 'fish',
        meaning: 'cá',
      },
    ],
    v: [
      {
        audio: five,
        ipa: '/faɪv/',
        vocabulary: 'five',
        meaning: 'số năm',
      },
    ],
    s: [
      {
        audio: sad,
        ipa: '/sæd/',
        vocabulary: 'sad',
        meaning: 'buồn',
      },
    ],
    z: [
      {
        audio: buzz,
        ipa: '/bʌz/',
        vocabulary: 'buzz',
        meaning: 'âm thanh kêu vo vo',
      },
    ],
    ʃ: [
      {
        audio: she,
        ipa: '/ʃiː/',
        vocabulary: 'she',
        meaning: 'cô ấy',
      },
    ],
    ʒ: [
      {
        audio: usual,
        ipa: '/ˈjuː.ʒu.əl/',
        vocabulary: 'usual',
        meaning: 'thông thường',
      },
    ],
    tʃ: [
      {
        audio: chicken,
        ipa: '/ˈtʃɪk.ɪn/',
        vocabulary: 'chicken',
        meaning: 'gà',
      },
    ],
    dʒ: [
      {
        audio: jazz,
        ipa: '/dʒæz/',
        vocabulary: 'jazz',
        meaning: 'nhạc jazz',
      },
    ],
  };

  const keys = [
    'ɪ',
    'æ',
    'ʊ',
    'uː',
    'ɒ',
    'eɪ',
    'ɔɪ',
    'aʊ',
    'aɪ',
    'oʊ',
    'iː',
    'e',
    'ʌ',
    'ə',
    'ɔː',
    'ɜː',
    'ʃ',
    'ʒ',
    'tʃ',
    'dʒ',
    'θ',
    'ð',
    'ŋ',
    'h',
    'w',
    'j',
    'r',
    'l',
    'm',
    'n',
    'p',
    'b',
    't',
    'd',
    'k',
    'ɡ',
    'f',
    'v',
    's',
    'z',
  ];

  const handleRecord = (blob) => {
    dispatch(record(blob));
  };

  const handleClick = (vowl) => {
    setIsOpenModal(true);
    setItemSelected(vowl);
    setCurrIndexVowl(0);
    setTotalVowl(vowl.length);

    setTimeout(() => {
      const audio = new Audio(vowl[0].audio);
      audio.play();
    }, 200);
  };

  useEffect(() => {
    if (audioText && itemSelected) {
      dispatch(
        getSpeakScore({
          answer: itemSelected[currIndexVowl].vocabulary,
          user: audioText,
        })
      );
    }
  }, [audioText]);

  useEffect(() => {
    if (!isOpenModal) {
      setCurrIndexVowl(null)
      setItemSelected(null)
      dispatch(getSpeakScoreSuccess(null))
      dispatch(recordSuccess(''))
      setTotalVowl(0)
    } 
  }, [isOpenModal])

  return (
    <CharacterContainer>
      <CharacterLayout>
        <TitleContainer>
          <TitleLayout>
            <TitleContentContainer>
              <MainTitle>Cùng học phát âm tiếng Anh nào!</MainTitle>
              <SubTitle>
                Tập nghe và học phát âm các âm trong tiếng Anh
              </SubTitle>
            </TitleContentContainer>
          </TitleLayout>
        </TitleContainer>
        <ListVowelContainer>
          <ListVowelLayout>
            <ListVowelTitle>Âm tiết</ListVowelTitle>
            <ListVowelBtnLayout>
              {keys.map((vowel, index) => {
                return (
                  <OptionAnswer
                    onClick={() => handleClick(arr[vowel])}
                    key={index}
                    no={1}
                    isShowNo={false}
                    content={
                      <BtnContentLayout>
                        <Symbol>{vowel}</Symbol>
                        <Word>{arr[vowel][0].vocabulary}</Word>
                      </BtnContentLayout>
                    }
                  />
                );
              })}
            </ListVowelBtnLayout>
          </ListVowelLayout>
        </ListVowelContainer>
      </CharacterLayout>
      {itemSelected && (
        <Modal
          title={'Luyện phát âm'}
          confirmLoading={isLoading}
          open={isOpenModal}
          onOk={() => {
            if (currIndexVowl + 1 < totalVowl) {
              setCurrIndexVowl(prev => prev + 1)
              dispatch(getSpeakScoreSuccess(null))
              dispatch(recordSuccess(''))
              setTimeout(() => {
                const audio = new Audio(itemSelected[currIndexVowl + 1].audio);
                audio.play();
              }, 200);
            }
            else {
              setIsOpenModal(false)
            }
          }}
          onCancel={() => {
            setIsOpenModal(false);
          }}
          okText="Tiếp theo"
          cancelText="Hủy"
        >
          <PronuceContainer>
            <PronuceLayout>
              <PronunceHeader>
                <img src={assistantIcon} />
                <div>
                  {score !== null
                    ? `Bạn phát âm ${itemSelected[currIndexVowl].vocabulary} giống ${Math.floor(score * 100)}% so với người bản xứ`
                    : 'Bạn bấm vào micro và đọc theo nhé.'}
                </div>
                {score !== null && (
                  <Progress
                    percent={Math.floor(score * 100)}
                    type="circle"
                    size={40}
                    trailColor="#cccccc"
                  />
                )}
                <div style={{position: 'absolute', right: 20, top: -35, fontSize: 18}}>{currIndexVowl + 1}/{totalVowl}</div>
              </PronunceHeader>
              <PronuceBody>
                <div>
                  <p className="vocabulary">
                    {itemSelected[currIndexVowl].vocabulary}
                  </p>
                  <p className="meaning">
                    {itemSelected[currIndexVowl].meaning}
                  </p>
                  <p className="ipa">{itemSelected[currIndexVowl].ipa}</p>
                  <button
                    className="speakBtn"
                    onClick={() => {
                      const audio = new Audio(
                        itemSelected[currIndexVowl].audio
                      );
                      audio.play();
                    }}
                  >
                    <img src={speakerSvg} alt="" />
                  </button>
                  <AudioRecorder
                    showVisualizer
                    onRecordingComplete={handleRecord}
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                  />
                </div>
              </PronuceBody>
            </PronuceLayout>
          </PronuceContainer>
        </Modal>
      )}
    </CharacterContainer>
  );
};

export default Character;
