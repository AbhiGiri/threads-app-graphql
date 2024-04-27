import express from 'express';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080

  app.use(express.json());

  // create GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `, // schema
    resolvers: {
      Query: {
        hello: () => `Hey there, Im a GraphQL Server.`,
        say: (_, {name}: {name: String}) => `Hey ${name}, how are you?`
      }
    }
  });

  // start the GraphQL server
  await gqlServer.start();

  app.get('/', (req, res) => {
    res.json({message: "Hello from Backend"});
  });

  app.use('/graphql', expressMiddleware(gqlServer))

  app.listen(PORT, () => console.log(`Server is running at port:http://localhost:${PORT}`));
 
};

init();