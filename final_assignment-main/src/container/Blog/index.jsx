import {
  BlogBody,
  BlogContainer,
  BlogLayout,
  BlogHeader,
  BlogCategoryHeader,
  BlogCategoryBody,
  BlogCategory,
  CardContainer,
  BlogTitle,
  BlogDescription,
  CardCustom,
} from './styled';
import { Button, Carousel, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './blogSlice';
import * as actions from './actions';
import { useEffect } from 'react';
import { TYPE } from './constants';
import { Link } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.selectIsLoading);
  const listBlogListen = useSelector(selectors.selectListBlogListen);
  const listBlogSpeak = useSelector(selectors.selectListBlogSpeak);
  const listBlogRead = useSelector(selectors.selectListBlogRead);
  const listBlogIpa = useSelector(selectors.selectListBlogIpa);
  const listSuggestBlog = useSelector(selectors.selectListBlogSuggest);

  console.log(listSuggestBlog);


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
    if (userId) {
      dispatch(actions.getListBlog(TYPE.listen));
      dispatch(actions.getListBlog(TYPE.speak));
      dispatch(actions.getListBlog(TYPE.read));
      dispatch(actions.getListBlog(TYPE.ipa));
      dispatch(actions.getListSuggestBlog(userId))
    }
    
  }, [userId]);

  return (
    <BlogContainer>
      <BlogLayout>
        <BlogHeader>Danh sách các bài viết</BlogHeader>
        <BlogBody>
          <BlogCategory>
            <BlogCategoryHeader>Dành cho bạn</BlogCategoryHeader>
            <BlogCategoryBody>
              <Carousel
                dots
                dotPosition="bottom"
                infinite
                autoplay
                slidesPerRow={3}
              >
                {listSuggestBlog.length &&
                  listSuggestBlog.map((blog, index) => {
                    return (
                      <Link
                        key={index}
                        to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
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
                            <BlogDescription>
                              {blog.description}
                            </BlogDescription>
                          </CardCustom>
                        </CardContainer>
                      </Link>
                    );
                  })}
              </Carousel>
              {!listSuggestBlog.length && <Empty />}
            </BlogCategoryBody>
          </BlogCategory>
          <BlogCategory>
            <BlogCategoryHeader>Kỹ năng nghe</BlogCategoryHeader>
            <BlogCategoryBody>
              <Carousel
                dots
                dotPosition="bottom"
                infinite
                autoplay
                slidesPerRow={3}
              >
                {listBlogListen.length &&
                  listBlogListen.map((blog, index) => {
                    return (
                      <Link
                        key={index}
                        to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
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
                            <BlogDescription>
                              {blog.description}
                            </BlogDescription>
                          </CardCustom>
                        </CardContainer>
                      </Link>
                    );
                  })}
              </Carousel>
              {!listBlogListen.length && <Empty />}
            </BlogCategoryBody>
          </BlogCategory>
          <BlogCategory>
            <BlogCategoryHeader>Kỹ năng nói</BlogCategoryHeader>
            <BlogCategoryBody>
              <Carousel
                dots
                dotPosition="bottom"
                infinite
                autoplay
                slidesPerRow={3}
              >
                {listBlogRead.length &&
                  listBlogRead.map((blog, index) => {
                    return (
                      <Link
                        key={index}
                        to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
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
                            <BlogDescription>
                              {blog.description}
                            </BlogDescription>
                          </CardCustom>
                        </CardContainer>
                      </Link>
                    );
                  })}
              </Carousel>
              {!listBlogRead.length && <Empty />}
            </BlogCategoryBody>
          </BlogCategory>
          <BlogCategory>
            <BlogCategoryHeader>Kỹ năng đọc</BlogCategoryHeader>
            <BlogCategoryBody>
              <Carousel
                dots
                dotPosition="bottom"
                infinite
                autoplay
                slidesPerRow={3}
              >
                {listBlogSpeak.length &&
                  listBlogSpeak.map((blog, index) => {
                    return (
                      <Link
                        key={index}
                        to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
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
                            <BlogDescription>
                              {blog.description}
                            </BlogDescription>
                          </CardCustom>
                        </CardContainer>
                      </Link>
                    );
                  })}
              </Carousel>
              {!listBlogSpeak.length && <Empty />}
            </BlogCategoryBody>
          </BlogCategory>
          <BlogCategory>
            <BlogCategoryHeader>Phiên âm IPA</BlogCategoryHeader>
            <BlogCategoryBody>
              <Carousel
                dots
                dotPosition="bottom"
                infinite
                autoplay
                slidesPerRow={3}
              >
                {listBlogIpa.length &&
                  listBlogIpa.map((blog, index) => {
                    return (
                      <Link
                        key={index}
                        to={`http://localhost:5173/blog_detail?id=${blog.id}&type=${blog.type}`}
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
                            <BlogDescription>
                              {blog.description}
                            </BlogDescription>
                          </CardCustom>
                        </CardContainer>
                      </Link>
                    );
                  })}
              </Carousel>
              {!listBlogIpa.length && <Empty />}
            </BlogCategoryBody>
          </BlogCategory>
        </BlogBody>
      </BlogLayout>
    </BlogContainer>
  );
};

export default Blog;
