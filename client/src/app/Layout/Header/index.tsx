import { FC } from 'react';
import { currentUserVar } from '../../../graphql/apolloClient';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../../graphql/mutations/authMutations';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE } from '../../../utils';

export const Header: FC = () => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('token');
      currentUserVar(null);
    },
  });

  return (
    <Wrappper>
      <div>Header</div>
      <nav>
        <Link to={LOGIN_ROUTE}>Авторизация</Link>
        <Link to={REGISTER_ROUTE}>Регистрация</Link>
        <Link to={USERS_ROUTE}>Юзера</Link>
      </nav>
      <button onClick={() => logout()}>Logout</button>
    </Wrappper>
  );
};

const Wrappper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
