import jwt from 'jsonwebtoken';
import tokenModel from '../../models/token-model';
import { ObjectId } from 'mongodb';
import { IResolvers } from '@graphql-tools/utils';
import TokenService from '../../service/token-service';
const tokenResolver: IResolvers = {
  Query: {
    async findToken(_, { refreshToken }: { refreshToken: string }) {
      return await TokenService.findToken(refreshToken);
    },
  },
  Mutation: {
    async generateTokens(_, { payload }: { payload: { userId: string; [key: string]: any } }) {
      const userId = new ObjectId(payload.userId);
      const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: '1m',
      });
      const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: '30d',
      });

      const tokenData = await tokenModel.findOne({ user: userId });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        await tokenData.save();
      } else {
        await tokenModel.create({ user: userId, refreshToken });
      }

      return { accessToken, refreshToken };
    },
    async removeToken(_, { refreshToken }: { refreshToken: string }) {
      const result = await tokenModel.deleteOne({ refreshToken });
      return result.deletedCount > 0;
    },
  },
};

export default tokenResolver;
