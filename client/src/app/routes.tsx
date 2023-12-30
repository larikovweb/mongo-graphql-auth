import { Pages } from '../pages';
import NotFound from '../pages/NotFound';
import { LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE } from '../utils';

export type RouteType = {
  path: string;
  component: JSX.Element;
};

export const publicRoutes: RouteType[] = [
  { path: LOGIN_ROUTE, component: <Pages.Login /> },
  { path: REGISTER_ROUTE, component: <Pages.Register /> },
  { path: '/activate/:token', component: <Pages.Activate /> },

  { path: '*', component: <NotFound /> },
];

export const privateRoutes: RouteType[] = [{ path: USERS_ROUTE, component: <Pages.Users /> }];
