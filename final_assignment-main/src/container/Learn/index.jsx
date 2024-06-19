import {
  LearnBody,
  LearnContainer,
  LearnHeader,
  LearnLayout,
  LearnSubHeader,
  LessonBody,
  LessonContainer,
  LessonDescription,
  LessonHeader,
  LessonLayout,
  LessonMenuItem,
  LessonTittle,
  ListLesson,
  DiagramLayout,
  TargetDiagramLayout,
  ResultDiagramLayout,
} from './styled';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from './learnSlice';
import * as actions from './actions';
import { useEffect, useState } from 'react';
import {
  starIcon,
  tickWhiteIcon,
  bookGrayIcon,
  bookWhiteIcon,
} from '../../constants/icons';
import { Link } from 'react-router-dom';
import { getTarget } from '../Target/actions';
import { selectTarget } from '../Target/targetSlice';
import { Progress } from 'antd';
import { PieChart } from '@mui/x-charts/PieChart';
const Learn = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.selectIsLoading);
  const listLesson = useSelector(selectors.selectListLesson);
  const target = useSelector(selectTarget);
  const listResult = useSelector(selectors.selectListResult);

  const [listResultListen, setListResultListen] = useState(null);
  const [listResultSpeak, setListResultSpeak] = useState(null);
  const [listResultRead, setListResultRead] = useState(null);
  const [studyTime, setStudyTime] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalMilliSecond, setTotalMilliSecond] = useState(0);

  useEffect(() => {
    const getCookie = (name) => {
      let nameEQ = name + '=';
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    };
    const userId = getCookie('id');
    const today = new Date();
    const dayIndex = today.getDay();

    // Điều chỉnh chỉ số ngày
    const adjustedDayIndex = (dayIndex + 6) % 7;
    if (userId) {
      dispatch(actions.getListLesson({ userId: +userId }));
      dispatch(actions.getListResult(+userId));
      dispatch(getTarget({ userId: +userId, dayOfWeek: adjustedDayIndex }));
    }
  }, [dispatch]);

  useEffect(() => {
    setListResultListen(() => {
      const res = listResult.filter((item) => item.type === 'listen');
      return {
        amountRight: res.filter((item) => item.isPass).length,
        amountWrong: res.filter((item) => !item.isPass).length,
      };
    });
    setListResultSpeak(() => {
      const res = listResult.filter((item) => item.type === 'speak');
      return {
        amountRight: res.filter((item) => item.isPass).length,
        amountWrong: res.filter((item) => !item.isPass).length,
      };
    });
    setListResultRead(() => {
      const res = listResult.filter((item) => item.type === 'read');
      return {
        amountRight: res.filter((item) => item.isPass).length,
        amountWrong: res.filter((item) => !item.isPass).length,
      };
    });
  }, [listResult]);

  useEffect(() => {
    if (target) {
      const milliSecond =
        [0.25, 0.5, 1, 1.5, 2, 2.5, 3][target.studyTime] * 60 * 60 * 1000;
      setTotalMilliSecond(milliSecond);
      const today = new Date();
      const dayIndex = today.getDay();

      // Điều chỉnh chỉ số ngày
      const adjustedDayIndex = (dayIndex + 6) % 7;
      const studyTime = JSON.parse(localStorage.getItem('studyTime'));
      const dayOfWeekCreated = JSON.parse(
        localStorage.getItem('dayOfWeekCreated')
      );
      if (studyTime !== null || dayOfWeekCreated !== null) {
        if (adjustedDayIndex !== dayOfWeekCreated) {
          localStorage.setItem('studyTime', '0');
          localStorage.setItem('dayOfWeekCreated', `${adjustedDayIndex}`);
        } else {
          setStudyTime(studyTime);
        }
      } else {
        localStorage.setItem('dayOfWeekCreated', `${adjustedDayIndex}`);
        localStorage.setItem('studyTime', '0');
      }
      const amount = JSON.parse(localStorage.getItem('amount'));
      if (amount !== null || dayOfWeekCreated !== null) {
        if (adjustedDayIndex !== dayOfWeekCreated) {
          localStorage.setItem('amount', '0');
          localStorage.setItem('dayOfWeekCreated', `${adjustedDayIndex}`);
        } else {
          setAmount(amount);
        }
      } else {
        localStorage.setItem('dayOfWeekCreated', `${adjustedDayIndex}`);
        localStorage.setItem('amount', '0');
      }
    }
  }, [target]);

  return (
    <LearnContainer>
      <LearnLayout>
        <ListLesson>
          <LearnHeader>Danh sách bài học của bạn</LearnHeader>
          <LearnBody>
            {listLesson.map((lesson, index) => {
              return (
                <LessonContainer key={index}>
                  <LessonLayout>
                    <LessonHeader>
                      <LessonTittle>{lesson.title}</LessonTittle>
                      <LessonDescription>
                        {lesson.description}
                      </LessonDescription>
                    </LessonHeader>
                    <LessonBody>
                      {index % 2 === 0 && (
                        <>
                          <Link
                            to={`/assigment?type=listen&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[0].id}`}
                          >
                            <LessonMenuItem style={{ left: -0 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[0].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=speak&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[1].id}`}
                          >
                            <LessonMenuItem style={{ left: -74.884 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[1].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=read&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[2].id}`}
                          >
                            <LessonMenuItem style={{ left: -100 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[2].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=test&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[3].id}`}
                          >
                            <LessonMenuItem
                              style={{ left: -74.884 }}
                              className={
                                lesson.assigmentList[0].isComplete &&
                                lesson.assigmentList[1].isComplete &&
                                lesson.assigmentList[2].isComplete
                                  ? ''
                                  : 'disabled'
                              }
                            >
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[0].isComplete &&
                                  lesson.assigmentList[1].isComplete &&
                                  lesson.assigmentList[2].isComplete
                                    ? bookWhiteIcon
                                    : bookGrayIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                        </>
                      )}
                      {index % 2 !== 0 && (
                        <>
                          <Link
                            to={`/assigment?type=listen&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[0].id}`}
                          >
                            <LessonMenuItem style={{ right: -0 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[0].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=speak&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[1].id}`}
                          >
                            <LessonMenuItem style={{ right: -74.884 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[1].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=read&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[2].id}`}
                          >
                            <LessonMenuItem style={{ right: -100 }}>
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[2].isComplete
                                    ? tickWhiteIcon
                                    : starIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                          <Link
                            to={`/assigment?type=test&lessonId=${lesson.id}&index=0&assigmentId=${lesson.assigmentList[3].id}`}
                          >
                            <LessonMenuItem
                              style={{ right: -74.884 }}
                              className={
                                lesson.assigmentList[0].isComplete &&
                                lesson.assigmentList[1].isComplete &&
                                lesson.assigmentList[2].isComplete
                                  ? ''
                                  : 'disabled'
                              }
                            >
                              <span>
                                <svg
                                  width="56"
                                  height="46"
                                  viewBox="0 0 56 46"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M34.235 3.251c1.08-1.124.47-2.974-1.084-3.108A39 39 0 0 0 29.801 0C13.341 0 0 10.252 0 22.898c0 3.5 1.022 6.818 2.85 9.785.628 1.018 2.037 1.092 2.866.23zm20.86 9.272c-1.74-2.91-5.276-5.65-7.873-7.312-.98-.628-2.245-.44-3.06.39-9.658 9.832-25.825 26.249-32.112 32.442-1.078 1.061-1.054 2.826.199 3.673 3.978 2.69 8.663 3.87 11.236 4.191.7.088 1.38-.181 1.884-.675 9.406-9.239 24.835-25.33 29.348-30.144.662-.706.875-1.734.378-2.565"
                                    fill="#72D627"
                                  />
                                </svg>
                              </span>
                              <img
                                src={
                                  lesson.assigmentList[0].isComplete &&
                                  lesson.assigmentList[1].isComplete &&
                                  lesson.assigmentList[2].isComplete
                                    ? bookWhiteIcon
                                    : bookGrayIcon
                                }
                              />
                            </LessonMenuItem>
                          </Link>
                        </>
                      )}
                    </LessonBody>
                  </LessonLayout>
                </LessonContainer>
              );
            })}
          </LearnBody>
        </ListLesson>
        <div>
          <LearnHeader>Thống kê quá trình học</LearnHeader>
          <DiagramLayout>
            <div>
              <LearnSubHeader>
                Tiến độ hoàn thành mục tiêu thao ngày
              </LearnSubHeader>
              {target ? (
                <TargetDiagramLayout>
                  <div style={{ textAlign: 'center' }}>
                    <Progress
                      percent={
                        studyTime - totalMilliSecond < 0
                          ? Math.floor((studyTime / totalMilliSecond) * 100)
                          : 100
                      }
                      type="circle"
                      size={160}
                    />
                    <div style={{ fontWeight: 700 }}>
                      Thời gian học đã đặt ra
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Progress
                      percent={
                        amount - target.amount < 0
                          ? Math.floor((amount / target.amount) * 100)
                          : 100
                      }
                      type="circle"
                      size={160}
                    />
                    <div style={{ fontWeight: 700 }}>Số bài học đã đặt ra</div>
                  </div>
                </TargetDiagramLayout>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 20,
                    border: '1px solid #cccccc',
                    borderRadius: 10,
                    fontWeight: 700,
                  }}
                >
                  Bạn chưa đặt mục tiêu cho ngày hôm nay.
                  <Link to={'/target'}> Nhấn vào đây để </Link>
                  đặt mục tiêu
                </div>
              )}
            </div>
            <div>
              <LearnSubHeader>Thống kê kết quả</LearnSubHeader>
              <ResultDiagramLayout>
                {listResultListen && (
                  <div style={{ textAlign: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: listResultListen.amountRight,
                              label: 'Trả lời đúng',
                            },
                            {
                              id: 1,
                              value: listResultListen.amountWrong,
                              label: 'Trả lời sai',
                            },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                    <div style={{ fontWeight: 700 }}>Kỹ năng nghe</div>
                  </div>
                )}
                {listResultSpeak && (
                  <div style={{ textAlign: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: listResultSpeak.amountRight,
                              label: 'Trả lời đúng',
                            },
                            {
                              id: 1,
                              value: listResultSpeak.amountWrong,
                              label: 'Trả lời sai',
                            },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                    <div style={{ fontWeight: 700 }}>Kỹ năng nói</div>
                  </div>
                )}
                {listResultRead && (
                  <div style={{ textAlign: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: listResultRead.amountRight,
                              label: 'Trả lời đúng',
                            },
                            {
                              id: 1,
                              value: listResultRead.amountWrong,
                              label: 'Trả lời sai',
                            },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                    <div style={{ fontWeight: 700 }}>Kỹ năng đọc</div>
                  </div>
                )}
              </ResultDiagramLayout>
            </div>
          </DiagramLayout>
        </div>
      </LearnLayout>
    </LearnContainer>
  );
};

export default Learn;
