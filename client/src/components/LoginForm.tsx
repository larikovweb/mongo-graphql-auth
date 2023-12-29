import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import { LOGIN_MUTATION, REGISTRATION_MUTATION } from '../graphql/mutations/authMutations';
import { currentUserVar } from '../graphql/apolloClient';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const [registration] = useMutation(REGISTRATION_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      if (data && data.authRes) {
        localStorage.setItem('token', data.authRes.accessToken);
        currentUserVar(data.authRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const { data } = await registration({
        variables: {
          email,
          password,
        },
      });
      if (data && data.authRes) {
        localStorage.setItem('token', data.authRes.accessToken);
        currentUserVar(data.authRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button disabled={loading} onClick={handleLogin}>
        Login
      </button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LoginForm;
