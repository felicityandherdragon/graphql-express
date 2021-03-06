const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const posts = [
  {
    title: 'First post',
    description: 'Content of the first post',
    author: 'Felicity'
  },
  {
    title: 'Second post',
    description: 'Content of the second post',
    author: 'Xueying'
  }
]

const authors = {
  'Flavio': {
    name: 'Flavio',
    age: 36
  },
  'Roger': {
    name: 'Roger',
    age: 7
  }
}

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    }
  }
})

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    author: {
      type: authorType,
      resolve: (source, params) => { //a resolver function can be async, so you can use async/await to lookup resources from a database or the network.
        return authors[source.author]
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
        return posts[id]
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema;
