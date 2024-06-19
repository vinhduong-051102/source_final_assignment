import {
  Input,
  InputLayout,
  RegisterContainer,
  RegisterLayout,
  Title,
  ButtonRedirectContainer,
  TextRedirectContainer,
  PasswordIconContainer,
  PasswordIconImg,
} from './styled';
import OptionAnswer from '../../common/OptionAnswer';
import { Link } from 'react-router-dom';
import { unShowPasswordIcon, showPasswordIcon } from '../../constants/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './registerSlice';
import * as actions from './actions';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    userName: string().required('Tên người dùng không được để trống'),
    password: string().required('Mật khẩu không được để trống'),
  });

  const form = useForm({
    mode: 'onChange',
    delayError: 300,
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      userName: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    const result = await form.trigger();
    if (result) {
      dispatch(actions.signup(form.getValues()));
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(actions.resetRedux());
      navigate('/signin');
    }
  }, [message, dispatch]);

  return (
    <RegisterContainer>
      <RegisterLayout>
        <Title>Tạo hồ sơ</Title>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputLayout>
            <FormProvider {...form}>
              <Controller
                name="userName"
                control={form.control}
                render={({ field }) => {
                  const isError = !!form.formState.errors?.userName;
                  return (
                    <div style={{ position: 'relative' }}>
                      <Input
                        {...field}
                        placeholder="Nhập tên người dùng"
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
                          {form.formState.errors?.userName?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => {
                  const isError = !!form.formState.errors?.email;
                  return (
                    <div style={{ position: 'relative' }}>
                      <Input
                        {...field}
                        placeholder="Nhập email"
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
                    ĐĂNG KÝ
                  </span>
                }
                defaultBgc="28, 176, 246"
                defaultBorderColor="24, 153, 214"
                defaultHoverBgc={'29,190,253'}
              />
            </FormProvider>
            <TextRedirectContainer>
              <span>Bạn đã có tài khoản? </span>
              <Link
                to="/signin"
                style={{
                  fontWeight: 700,
                  color: 'rgb(28,176,246)',
                }}
              >
                ĐĂNG NHẬP
              </Link>
            </TextRedirectContainer>
          </InputLayout>
        </form>
      </RegisterLayout>
      <ButtonRedirectContainer>
        <Link to="/signin">
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
                ĐĂNG NHẬP
              </span>
            }
          />
        </Link>
      </ButtonRedirectContainer>
    </RegisterContainer>
  );
};

export default Register;
