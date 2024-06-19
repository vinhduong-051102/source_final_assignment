import styled from 'styled-components';
import { colorSnow, colorSwan } from '../../../../constants/colors';
import { btnBorderRadius } from '../../../../constants/border_radius';
import { btnBoxShadow } from '../../../../constants/box_shadow_btn';

const tickContainerSize = '80px';

export const FooterContainer = styled.div`
  background-color: rgb(${(props) => props.bgc});
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 140px;
  overflow: hidden;
  display: flex;
  border-top: 2px solid
    ${(props) => (props.isChecked ? 'transparent' : `rgb(${colorSwan})`)};
  @media (max-width: 767px) {
    padding: 24px 16px;
  }
`;

export const FooterLayout = styled.div`
  display: grid;
  grid-gap: 8px 16px;
  align-items: center;
  @media (min-width: 769px) {
    justify-items: stretch;
    grid-auto-rows: auto;
    grid-template-columns: ${(props) =>
      props.isChecked ? '1fr min-content' : '1fr 1fr'};
    grid-template-rows: 100%;
    justify-content: space-between;
    margin: 0 auto;
    width: 60%;
  }
  @media (max-width: 768px) and (min-width: 426px) {
    justify-items: stretch;
    grid-auto-rows: auto;
    grid-template-columns: ${(props) =>
      props.isChecked ? '1fr min-content' : '1fr 1fr'};
    grid-template-rows: 100%;
    justify-content: space-between;
    margin: 0 auto;
    width: 70%;
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const FooterInfoWrapper = styled.div`
  grid-gap: 16px;
  display: grid;
  grid-auto-flow: column;
  @media (min-width: 768px) {
    grid-template-columns: min-content 1fr;
  }
`;

export const FooterInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(${(props) => props.textInfoColor});
`;

export const InfoTextComment = styled.div`
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
`;

export const InfoTextCorrectAnswer = styled.div`
  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

export const FooterTickIconContainer = styled.div`
  width: ${tickContainerSize};
  height: ${tickContainerSize};
  background-color: rgb(${colorSnow});
  border-radius: 50%;
  position: relative;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const FooterTickIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export const FooterCheckBtnWrapper = styled.div`
  text-align: right;
  & > button:hover {
    background-color: rgb(${(props) => props.btnCheckBgcHover});
  }
`;

export const FooterCheckBtn = styled.button`
  border-radius: ${btnBorderRadius};
  width: 150px;
  background-color: rgb(${(props) => props.btnCheckBgc});
  box-shadow: ${btnBoxShadow};
  color: rgb(${(props) => props.btnCheckBorderColor});
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const CheckBtnText = styled.span`
  color: rgb(${(props) => props.btnCheckTextColor});
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const FooterSkipBtnWrapper = styled.div`
  text-align: left;
  & > button:hover {
    color: rgb(${(props) => props.btnSkipBorderColorHover});
    background-color: rgb(${(props) => props.btnSkipBgcHover});
    border-color: rgb(${(props) => props.btnSkipBorderColorHover});
  }
`;

export const FooterSkipBtn = styled(FooterCheckBtn)`
  border: 2px solid rgb(${colorSwan});
  border-bottom: 0;
`;
