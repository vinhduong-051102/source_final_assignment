import { Navigate, Route, Routes } from 'react-router';
import Menu from '../src/common/Menu';
import AssigmentWrapper from './common/AssigmentWrapper';
import Character from './container/Character';
import CreateLesson from './container/CreateLesson';
import Chat from './container/Chat';
import Login from './container/Login';
import Register from './container/Register';
import ErrorPage from './container/ErrorPage';
import LayoutWithLogin from './layout/LayoutWithLogin';
import Learn from './container/Learn';
import Target from './container/Target';
import Pronuce from './container/Pronunce';
import Blog from './container/Blog';
import BlogDetail from './container/BlogDetail';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to="/learn" />} />
      <Route
        path={'/learn'}
        element={
          <LayoutWithLogin>
            <Menu>
              <Learn />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route
        path={'/characters'}
        element={
          <LayoutWithLogin>
            <Menu>
              <Character />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route
        path={'/add'}
        element={
          <LayoutWithLogin>
            <Menu>
              <CreateLesson />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route
        path={'/chat'}
        element={
          <LayoutWithLogin>
            <Menu>
              <Chat />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route
        path={'/target'}
        element={
          <LayoutWithLogin>
            <Menu>
              <Target />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route
        path={'/blog'}
        element={
          <LayoutWithLogin>
            <Menu>
              <Blog />
            </Menu>
          </LayoutWithLogin>
        }
      />
      <Route path={'/signin'} element={<Login />} />
      <Route path={'/signup'} element={<Register />} />
      <Route path={'/test'} element={<Pronuce />} />
      <Route path={'/blog_detail'} element={<BlogDetail />} />
      <Route path={'/assigment'} element={<AssigmentWrapper />} />
      <Route path={'*'} element={<ErrorPage />} />
    </Routes>
    //   <AssigmentWrapper/>
  );
}

export default App;
