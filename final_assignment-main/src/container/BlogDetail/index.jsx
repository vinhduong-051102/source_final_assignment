import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailBlog,
  getListRelativeBlog,
  createComment,
  getListComment,
} from '../Blog/actions';
import {
  selectBlogDetail,
  selectIsLoading,
  selectListRelativeBlog,
  selectListComment,
} from '../Blog/blogSlice';
import { useEffect, useState } from 'react';
import { Button, Empty, Input } from 'antd';
import {
  BlogComment,
  BlogDetailBody,
  BlogDetailContainer,
  BlogDetailLayout,
  BlogDetailHeader,
  BlogCommentHeader,
  RelateBlogContainer,
  RelateBlogHeader,
  RelateBlogList,
  ListComment,
  CommentLayuout,
} from './styled';
import { Link } from 'react-router-dom';
import {
  CardContainer,
  CardCustom,
  BlogTitle,
  BlogDescription,
} from '../Blog/styled';

const BlogDetail = () => {
  const dispatch = useDispatch();
  const blogDetail = useSelector(selectBlogDetail);
  const listRelativeBlog = useSelector(selectListRelativeBlog);
  const isLoading = useSelector(selectIsLoading);
  const listComment = useSelector(selectListComment);

  const [comment, setComment] = useState('');

  // Lấy URL hiện tại
  const urlParams = new URLSearchParams(window.location.search);

  // Lấy giá trị của tham số tìm kiếm có tên là 'paramName'
  const id = urlParams.get('id');
  const type = urlParams.get('type');

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
  const userId = +getCookie('id');

  useEffect(() => {
    if (id && type) {
      dispatch(getDetailBlog(+id));
      dispatch(getListRelativeBlog({ id: +id, type: +type }));
      dispatch(getListComment(+id));
    }
  }, [id, type]);

  return (
    <BlogDetailContainer>
      <BlogDetailLayout>
        <div
          style={{
            padding: 20,
            border: '1px solid #cccccc',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <BlogDetailHeader>{blogDetail.title}</BlogDetailHeader>
          <BlogDetailBody>
            <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} />
          </BlogDetailBody>
          <BlogComment>
            <BlogCommentHeader>
              {listComment.length} bình luận
            </BlogCommentHeader>
            <div>
              <Input.TextArea
                placeholder="Nhập bình luận của bạn"
                style={{ padding: '8px 16px', fontSize: 18 }}
                size="255"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}
            >
              <Button
                loading={isLoading}
                type="primary"
                onClick={() => {
                  setComment('');
                  dispatch(
                    createComment({
                      userId: userId,
                      blogId: +id,
                      content: comment,
                    })
                  );
                }}
              >
                Bình luận
              </Button>
            </div>
            <ListComment>
              {listComment.length ? (
                listComment.map((comment, index) => {
                  return (
                    <CommentLayuout key={index}>
                      <div>
                        <div className="email">{comment.email}</div>
                      </div>
                      <div className="content">{comment.content}</div>
                    </CommentLayuout>
                  );
                })
              ) : (
                <Empty />
              )}
            </ListComment>
          </BlogComment>
        </div>
        <RelateBlogContainer>
          <RelateBlogHeader>Các bài viết liên quan</RelateBlogHeader>
          <RelateBlogList>
            {listRelativeBlog.map((blog, index) => {
              return (
                <Link
                  key={index}
                  style={{ width: '100%' }}
                  to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
                  reloadDocument
                >
                  <CardContainer>
                    <CardCustom
                      hoverable
                      cover={
                        <img
                          alt="example"
                          src={`http://localhost:3333/assets/${blog.thumbnail}`}
                        />
                      }
                    >
                      <BlogTitle>{blog.title}</BlogTitle>
                      <BlogDescription>{blog.description}</BlogDescription>
                    </CardCustom>
                  </CardContainer>
                </Link>
              );
            })}
          </RelateBlogList>
        </RelateBlogContainer>
      </BlogDetailLayout>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 30, left: 30 }}
      >
        <Link to={'/blog'}>Trở lại</Link>
      </Button>
    </BlogDetailContainer>
  );
};

export default BlogDetail;
