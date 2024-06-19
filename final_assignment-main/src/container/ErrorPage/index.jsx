import { ErrorPageContainer, ErrorPageLayout, Img, Text } from './styled';
import { cryIcon } from '../../constants/icons';

const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <ErrorPageLayout>
        <Img src={cryIcon} />
        <Text>Chúng tôi không tìm thấy trang mà bạn muốn truy cập</Text>
      </ErrorPageLayout>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
