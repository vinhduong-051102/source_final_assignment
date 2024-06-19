import styled from 'styled-components';

export const BlogDetailContainer = styled.div`
  display: flex;
  position: relative;
  & * {
    box-sizing: border-box;
  }
`;

export const BlogDetailLayout = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 100%;
  padding: 70px 0;
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 40px;
`;

export const BlogDetailHeader = styled.div`
  font-size: 30px;
  line-height: 39px;
  font-weight: 700;
  color: #000;
  margin-bottom: 40px;
`;

export const BlogDetailBody = styled.div``;

export const BlogComment = styled.div`
  margin-top: 50px;
`;

export const BlogCommentHeader = styled.div`
  font-size: 20px;
  line-height: 2.8rem;
  font-weight: 700;
`;

export const RelateBlogContainer = styled.div`
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 10px;
`;

export const RelateBlogHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 2.8rem;
  margin-bottom: 40px;
  margin-left: 15px;
`;

export const RelateBlogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ListComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  border: 1px #cccccc solid;
  border-radius: 10px;
`;

export const CommentLayuout = styled.div`
  display: flex;
  flex-direction: column;
  & .email {
    background-color: #888888;
    border-radius: 12px;
    padding-right: 6px;
    padding-left: 6px;
    font-size: 1.3rem;
    font-weight: 500;
    border: 1px solid transparent;
    font-weight: 700;
    color: #ffffff;
    display: inline;
  }
  & .content {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
  }
`;
