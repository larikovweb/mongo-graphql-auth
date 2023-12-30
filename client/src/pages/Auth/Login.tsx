import { FC } from 'react';
import * as S from './styled';
import { useForm } from 'react-hook-form';
import { LOGIN_MUTATION } from '../../graphql/mutations/authMutations';
import { useMutation } from '@apollo/client';
import { currentUserVar } from '../../graphql/apolloClient';

const Login: FC = () => {
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.authRes.accessToken);
      currentUserVar(data.authRes);
    },
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      await login({
        variables: {
          email,
          password,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Login</S.Title>
        <S.Input
          {...register('email', { required: 'Почта не может быть пустой' })}
          type="email"
          placeholder="Email"
        />
        <S.Input
          {...register('password', { required: 'Пароль не может быть пустой' })}
          type="password"
          placeholder="Password"
        />
        <S.Button disabled={loading}>Login</S.Button>
      </S.Form>
    </S.Wrapper>
  );
};

export default Login;
