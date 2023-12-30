import { FC } from 'react';
import { UserList } from '../../components/UserList';
import styled from '@emotion/styled';

const Users: FC = () => {
  return (
    <Wrapper>
      <UserList />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Users;
