import userResolvers from './userResolvers';
// Здесь вы можете добавить другие резолверы, например postResolvers, commentResolvers и т.д.
// import postResolvers from './postResolvers';
// import commentResolvers from './commentResolvers';

const rootResolvers = {
  Query: {
    ...userResolvers.Query,
    // ...postResolvers.Query,
    // ...commentResolvers.Query,
    // Другие запросы (Queries) могут быть добавлены здесь
  },
  Mutation: {
    ...userResolvers.Mutation,
    // ...postResolvers.Mutation,
    // ...commentResolvers.Mutation,
    // Другие мутации (Mutations) могут быть добавлены здесь
  },
  // Также можно добавить резолверы для подписок (Subscriptions), если они используются в вашем API
  // Subscription: {
  //   ...userResolvers.Subscription,
  //   ...postResolvers.Subscription,
  //   ...commentResolvers.Subscription,
  //   // Другие подписки могут быть добавлены здесь
  // },
};

export default rootResolvers;
