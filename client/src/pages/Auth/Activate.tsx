import { FC, useEffect } from 'react';
import * as S from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIVATE_MUTATION } from '../../graphql/mutations/authMutations';
import { useMutation } from '@apollo/client';
import { USERS_ROUTE } from '../../utils';

const Activate: FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [activate] = useMutation(ACTIVATE_MUTATION);

  useEffect(() => {
    activateAccount(token);
  }, [token, activate]);

  const activateAccount = async (token: string | undefined) => {
    try {
      const { data } = await activate({
        variables: {
          activationLink: token,
        },
      });
      navigate(USERS_ROUTE);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <S.Wrapper>
      <S.Title>Activate your account</S.Title>
    </S.Wrapper>
  );
};

export default Activate;
