import styled from 'styled-components';
import { Card } from 'antd';

export const BlogContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const BlogLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlogHeader = styled.div`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: rgb(75, 75, 75);
`;

export const BlogBody = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

export const BlogCategory = styled.div`
  margin-bottom: 30px;
`;

export const BlogCategoryHeader = styled.div`
  color: rgb(75, 75, 75);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-left: 20px;
`;

export const BlogCategoryBody = styled.div``;
export const CardContainer = styled.div`
  padding: 0 20px;
  box-sizing: border-box;
  
`;

export const BlogTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  height: 1.5em;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Số dòng tối đa */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BlogDescription = styled.div`
  font-size: 18px;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Số dòng tối đa */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3.5em; /* Đặt chiều cao tương ứng với số dòng tối đa */
`;

export const CardCustom = styled(Card)`
  & .ant-card-body {
    height: 150px;
    padding: 10px;
    background-color: #ccc;
  }

  & .ant-card-cover > img {
    height: 230px;
  }
`;
