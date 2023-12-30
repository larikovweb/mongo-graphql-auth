import { FC } from 'react';
import * as S from './styled';
import { useForm } from 'react-hook-form';
import { REGISTRATION_MUTATION } from '../../graphql/mutations/authMutations';
import { useMutation } from '@apollo/client';
import { currentUserVar } from '../../graphql/apolloClient';

const Register: FC = () => {
  const [registration, { loading }] = useMutation(REGISTRATION_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.authRes.accessToken);
      currentUserVar(data.authRes);
    },
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      await registration({
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
        <S.Title>Register</S.Title>
        <S.Input {...register('email', { required: true })} type="email" placeholder="Email" />
        <S.Input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
        />
        <S.Button disabled={loading}>Register</S.Button>
      </S.Form>
    </S.Wrapper>
  );
};

export default Register;
