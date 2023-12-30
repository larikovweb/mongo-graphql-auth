import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { privateRoutes, publicRoutes } from './routes';
import { useMutation, useReactiveVar } from '@apollo/client';
import { currentUserVar } from '../graphql/apolloClient';
import { isNull } from '@bunt/is';
import { REFRESH_MUTATION } from '../graphql/mutations/authMutations';
import { GlobalStyles } from '../styles/GlobalStyles';

const Application: FC = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <RouteSelect />
      </BrowserRouter>
    </>
  );
};

const RouteSelect: FC = () => {
  const [refresh] = useMutation(REFRESH_MUTATION, {
    onCompleted: (data) => currentUserVar(data.authRes),
    onError: (error) => alert(error.message),
  });

  const user = useReactiveVar(currentUserVar);
  const isAuth = !isNull(user);
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    if (accessToken) {
      refresh();
    }
  }, [accessToken, refresh]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {publicRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
        {isAuth &&
          privateRoutes.map(
            ({ path, component }) => isAuth && <Route key={path} path={path} element={component} />,
          )}
      </Route>
    </Routes>
  );
};

export default Application;
