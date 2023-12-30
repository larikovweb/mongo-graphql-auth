import UserModel from '../../models/user-model';
import ApiError from '../../exceptions/api-error';
import { IUser } from '../../interfaces';
import { IResolvers } from '@graphql-tools/utils';
import { validationResult } from 'express-validator';
import UserService from '../../service/user-service';
import TokenService from '../../service/token-service';

interface RegistrationArgs {
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface ActivateArgs {
  activationLink: string;
}

const userResolvers: IResolvers = {
  Query: {
    allUsers: async (
      _: unknown,
      __: unknown,
      context: { authorization?: string },
    ): Promise<IUser[]> => {
      if (!context.authorization) {
        throw new Error('No authorization token provided');
      }

      // Извлечение токена из строки авторизации
      const token = context.authorization.split(' ')[1];
      if (!token) {
        throw new Error('Authorization token is malformed');
      }

      // Валидация и расшифровка токена авторизации
      const userPayload = TokenService.validateAccessToken(token);
      if (!userPayload) {
        throw new Error('Invalid or expired token');
      }

      // После валидации и подтверждения, что токен корректный и не истек, вы можете продолжить получать данные
      const users = await UserModel.find();
      return users;
    },
  },
  Mutation: {
    registration: async (_: any, { email, password }: RegistrationArgs, { req, res, next }) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw ApiError.BadRequest('Ошибка при валидации', errors.array());
        }
        const userData = await UserService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return {
          accessToken: userData.accessToken,
          user: userData.user,
        };
      } catch (e) {
        if (e instanceof ApiError) {
          throw new Error(`${e.status}: ${e.message}`);
        }
        throw new Error('Непредвиденная ошибка');
      }
    },
    login: async (_: any, { email, password }: LoginArgs, { req, res }) => {
      try {
        const userData = await UserService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return {
          accessToken: userData.accessToken,
          user: userData.user,
        };
      } catch (e) {
        if (e instanceof ApiError) {
          throw new Error(`${e.status}: ${e.message}`);
        }
        throw new Error('Непредвиденная ошибка');
      }
    },
    logout: async (_: any, __: any, { req, res }) => {
      try {
        const { refreshToken } = req.cookies;
        //TODO
        const token = await UserService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return true;
      } catch (e) {
        if (e instanceof ApiError) {
          throw new Error(`${e.status}: ${e.message}`);
        }
        throw new Error('Непредвиденная ошибка');
      }
    },
    refresh: async (_: any, __: any, { req, res }) => {
      try {
        const { refreshToken } = req.cookies;
        const userData = await UserService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return {
          accessToken: userData.accessToken,
          user: userData.user,
        };
      } catch (e) {
        if (e instanceof ApiError) {
          throw new Error(`${e.status}: ${e.message}`);
        }
        throw new Error('Непредвиденная ошибка');
      }
    },
    activate: async (_: any, { activationLink }: ActivateArgs) => {
      const user = await UserModel.findOne({ activationLink });
      if (!user) {
        throw ApiError.BadRequest('Некорректная ссылка активации');
      }
      user.isActivated = true;
      await user.save();
      return user;
    },
  },
};

export default userResolvers;
