import { useMutation, useReactiveVar } from '@apollo/client';
import LoginForm from './components/LoginForm';
import { currentUserVar } from './graphql/apolloClient';
import { UserList } from './components/UserList';
import { useEffect } from 'react';
import { LOGOUT_MUTATION, REFRESH_MUTATION } from './graphql/mutations/authMutations';

function App() {
  const [refresh] = useMutation(REFRESH_MUTATION, {
    onCompleted: (data) => currentUserVar(data.authRes),
    onError: (error) => alert(error.message),
  });
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('token');
      currentUserVar(null);
    },
  });
  const user = useReactiveVar(currentUserVar);
  const isAuth = !!user;
  const email = user?.user.email;
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    if (accessToken) {
      refresh();
    }
  }, []);

  return (
    <div className="App">
      <h1>{isAuth ? `Пользователь ${email} авторизован` : 'Авторизуйтесь'}</h1>
      <LoginForm />
      <UserList />
      <button onClick={() => refresh()}>Обновить accessToken</button>
      <button onClick={() => logout()}>Выйти</button>
    </div>
  );
}

export default App;
