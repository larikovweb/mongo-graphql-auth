// Импортируем определения типов для токенов
import tokenTypeDefs from './tokenTypeDefs';
// Импортируем определения типов для пользователей
import userTypeDefs from './userTypeDefs';

// Объединяем определения типов пользователей и токенов в один массив
const typeDefs = [userTypeDefs, tokenTypeDefs];

// Экспортируем объединенные определения типов для использования в Apollo Server
export default typeDefs;
