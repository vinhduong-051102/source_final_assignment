import {
  ButtonRedirectContainer,
  Input,
  InputLayout,
  LoginContainer,
  LoginLayout,
  Title,
  TextRedirectContainer,
  PasswordIconContainer,
  PasswordIconImg,
} from './styled';
import OptionAnswer from '../../common/OptionAnswer';
import { Link } from 'react-router-dom';
import { showPasswordIcon, unShowPasswordIcon } from '../../constants/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import * as selectors from './loginSlice';
import { useNavigate } from 'react-router';
import { object, string } from 'yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginSuccess = useSelector(selectors.selectIsLoginSuccess);
  const isLoading = useSelector(selectors.selectIsLoading);
  const message = useSelector(selectors.selectMessage);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const schema = object({
    email: string()
      .required('Email không được để trống')
      .test('', 'Email không đúng định dạng', (value) => {
        const REGEX_EMAIL = /^[\w_\.]{3,32}@([\w-]+\.)+[\w-]{2,4}$/;
        return REGEX_EMAIL.test(value);
      }),
    password: string().required('Mật khẩu không được để trống'),
  });

  const form = useForm({
    mode: 'onChange',
    delayError: 500,
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignin = async () => {
    const result = await form.trigger();
    if (result) {
      dispatch(actions.signin(form.getValues()));
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(actions.resetRedux());
    }
    if (isLoginSuccess) {
      navigate('/');
    }
  }, [dispatch, message, isLoginSuccess]);

  return (
    <LoginContainer>
      <LoginLayout>
        <Title>Đăng nhập</Title>
        <form onSubmit={form.handleSubmit(handleSignin)}>
          <FormProvider {...form}>
            <InputLayout>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => {
                  const isError = !!form.formState.errors?.email;
                  return (
                    <div style={{ position: 'relative' }}>
                      <Input
                        placeholder="Nhập email"
                        {...field}
                        isError={isError}
                      />
                      {isError && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: -25,
                            left: 5,
                            color: 'rgb(234,43,43)',
                          }}
                        >
                          {form.formState.errors?.email?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => {
                  const isError = !!form.formState.errors?.password;
                  return (
                    <div style={{ position: 'relative' }}>
                      <Input
                        placeholder="Nhập mật khẩu"
                        type={isShowPassword ? 'text' : 'password'}
                        {...field}
                        isError={isError}
                      />
                      <PasswordIconContainer
                        onClick={() => setIsShowPassword((prev) => !prev)}
                      >
                        <PasswordIconImg
                          src={
                            isShowPassword
                              ? unShowPasswordIcon
                              : showPasswordIcon
                          }
                        />
                      </PasswordIconContainer>
                      {isError && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: -25,
                            left: 5,
                            color: 'rgb(234,43,43)',
                          }}
                        >
                          {form.formState.errors?.password?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
              <OptionAnswer
                no={1}
                isShowNo={false}
                content={
                  <span
                    style={{
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    ĐĂNG NHẬP
                  </span>
                }
                defaultBgc="28, 176, 246"
                defaultBorderColor="24, 153, 214"
                defaultHoverBgc={'29,190,253'}
              />
              <TextRedirectContainer>
                <span>Bạn chưa có tài khoản? </span>
                <Link
                  to="/signup"
                  style={{
                    fontWeight: 700,
                    color: 'rgb(28,176,246)',
                  }}
                >
                  ĐĂNG KÝ
                </Link>
              </TextRedirectContainer>
            </InputLayout>
          </FormProvider>
        </form>
      </LoginLayout>
      <ButtonRedirectContainer>
        <Link to="/signup">
          <OptionAnswer
            no={1}
            isShowNo={false}
            content={
              <span
                style={{
                  fontWeight: 700,
                  color: 'rgb(28,176,246)',
                }}
              >
                ĐĂNG KÝ
              </span>
            }
          />
        </Link>
      </ButtonRedirectContainer>
    </LoginContainer>
  );
};

export default Login;
