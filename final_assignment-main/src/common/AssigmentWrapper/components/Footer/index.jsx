import {
  CheckBtnText,
  FooterCheckBtn,
  FooterCheckBtnWrapper,
  FooterContainer,
  FooterInfoTextContainer,
  FooterInfoWrapper,
  FooterLayout,
  FooterSkipBtn,
  FooterSkipBtnWrapper,
  FooterTickIcon,
  FooterTickIconContainer,
  InfoTextComment,
  InfoTextCorrectAnswer,
} from './styled';
import { tickIcon, wrongIcon } from '../../../../constants/icons';
import {
  colorCardinal,
  colorFireAnt,
  colorFireArtHover,
  colorHare,
  colorOwl,
  colorOwlHover,
  colorSeaSponge,
  colorSnow,
  colorSwan,
  colorTreeFlog,
  colorWalkingFish,
} from '../../../../constants/colors';

const Footer = ({
  statusCode = 0,
  comment = '',
  answer = '',
  onCheck,
  onSkip,
  onNext,
}) => {
  // Trạng thái 0: chưa làm gì
  // Trạng thái 1: trả lời đúng
  // Trạng thái 2: trả lời sai
  // Trạng thái 3: chờ kiểm tra
  const footerStatus = [
    // Trạng thái 0
    {
      isChecked: false,
      bgc: colorSnow,
      btnSkipBgc: colorSnow,
      btnSkipBgcHover: colorSwan,
      btnSkipBorderColorHover: colorHare,
      btnSkipTextColor: colorHare,
      btnSkipBorderColor: colorSwan,
      btnSkipText: 'Bỏ qua',
      btnCheckBgc: colorSwan,
      btnCheckBgcHover: null,
      btnCheckBorderColor: colorSwan,
      btnCheckTextColor: colorHare,
      btnCheckText: 'Kiểm tra',
      iconSrc: null,
      textInfoColor: null,
      isDisabledCheckBtn: true,
    },
    // Trạng thái 1
    {
      btnSkipText: null,
      isChecked: true,
      iconSrc: tickIcon,
      bgc: colorSeaSponge,
      textInfoColor: colorTreeFlog,
      btnCheckBgc: colorOwl,
      btnCheckBgcHover: colorOwlHover,
      btnCheckBorderColor: colorTreeFlog,
      btnCheckTextColor: colorSnow,
      btnCheckText: 'Tiếp tục',
      btnSkipBgc: null,
      btnSkipTextColor: null,
      btnSkipBorderColor: null,
      btnSkipBgcHover: null,
      btnSkipBorderColorHover: null,
      isDisabledCheckBtn: false,
    },
    // Trạng thái 2
    {
      btnSkipText: null,
      isChecked: true,
      iconSrc: wrongIcon,
      bgc: colorWalkingFish,
      textInfoColor: colorFireAnt,
      btnCheckBgc: colorCardinal,
      btnCheckBgcHover: colorFireArtHover,
      btnCheckBorderColor: colorFireAnt,
      btnCheckTextColor: colorSnow,
      btnCheckText: 'Tiếp tục',
      btnSkipBgc: null,
      btnSkipTextColor: null,
      btnSkipBorderColor: null,
      btnSkipBgcHover: null,
      btnSkipBorderColorHover: null,
      isDisabledCheckBtn: false,
    },
    // Trạng thái 3
    {
      isChecked: false,
      bgc: colorSnow,
      btnSkipBgc: colorSnow,
      btnSkipTextColor: colorHare,
      btnSkipBorderColor: colorSwan,
      btnSkipBgcHover: colorSwan,
      btnSkipBorderColorHover: colorHare,
      btnSkipText: 'Bỏ qua',
      btnCheckBgc: colorOwl,
      btnCheckBgcHover: colorOwlHover,
      btnCheckBorderColor: colorTreeFlog,
      btnCheckTextColor: colorSnow,
      btnCheckText: 'Kiểm tra',
      iconSrc: null,
      textInfoColor: null,
      isDisabledCheckBtn: false,
    },
  ];
  return (
    <FooterContainer
      bgc={footerStatus[statusCode].bgc}
      isChecked={footerStatus[statusCode].isChecked}
    >
      <FooterLayout isChecked={footerStatus[statusCode].isChecked}>
        {
          // Kiểm tra xem bài tập đã được kiểm tra hay chưa
          footerStatus[statusCode].isChecked ? (
            // Thông báo
            <FooterInfoWrapper>
              <FooterTickIconContainer>
                <FooterTickIcon src={footerStatus[statusCode].iconSrc} />
              </FooterTickIconContainer>
              <FooterInfoTextContainer
                textInfoColor={footerStatus[statusCode].textInfoColor}
              >
                <InfoTextComment>{comment}</InfoTextComment>
                <InfoTextCorrectAnswer>{answer}</InfoTextCorrectAnswer>
              </FooterInfoTextContainer>
            </FooterInfoWrapper>
          ) : (
            // Nút bỏ qua
            <FooterSkipBtnWrapper
              btnSkipBgcHover={footerStatus[statusCode].btnSkipBgcHover}
              btnSkipBorderColorHover={
                footerStatus[statusCode].btnSkipBorderColorHover
              }
            >
              <FooterSkipBtn
                onClick={
                  statusCode === 0 || statusCode === 3 ? onSkip : () => {}
                }
                btnCheckBgc={footerStatus[statusCode].btnSkipBgc}
                btnCheckBorderColor={
                  footerStatus[statusCode].btnSkipBorderColor
                }
              >
                <CheckBtnText
                  btnCheckTextColor={footerStatus[statusCode].btnSkipTextColor}
                >
                  {footerStatus[statusCode].btnSkipText}
                </CheckBtnText>
              </FooterSkipBtn>
            </FooterSkipBtnWrapper>
          )
        }
        <FooterCheckBtnWrapper
          btnCheckBgcHover={footerStatus[statusCode].btnCheckBgcHover}
        >
          {(statusCode === 3 || statusCode === 0) && (
            <FooterCheckBtn
              onClick={statusCode === 3 ? onCheck : () => {}}
              btnCheckBgc={footerStatus[statusCode].btnCheckBgc}
              btnCheckBorderColor={footerStatus[statusCode].btnCheckBorderColor}
              disabled={footerStatus[statusCode].isDisabledCheckBtn}
            >
              <CheckBtnText
                btnCheckTextColor={footerStatus[statusCode].btnCheckTextColor}
              >
                {footerStatus[statusCode].btnCheckText}
              </CheckBtnText>
            </FooterCheckBtn>
          )}
          {(statusCode === 1 || statusCode === 2) && (
            <FooterCheckBtn
              onClick={onNext}
              btnCheckBgc={footerStatus[statusCode].btnCheckBgc}
              btnCheckBorderColor={footerStatus[statusCode].btnCheckBorderColor}
              disabled={footerStatus[statusCode].isDisabledCheckBtn}
            >
              <CheckBtnText
                btnCheckTextColor={footerStatus[statusCode].btnCheckTextColor}
              >
                {footerStatus[statusCode].btnCheckText}
              </CheckBtnText>
            </FooterCheckBtn>
          )}
        </FooterCheckBtnWrapper>
      </FooterLayout>
    </FooterContainer>
  );
};

export default Footer;
