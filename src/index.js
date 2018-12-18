const { GraphQLServer } = require('graphql-yoga')

// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
  {id: 'link-1',
  url: 'www.google.com',
  description: 'The google'
 }]


let idCount = links.length

const resolvers = {

  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(link => {
      return link.id === args.id
    })
  },

  Mutation: {
	  post: (root, args) => {
		  const link = {
		  id: `link-${idCount++}`,
		  description: args.description,
		  url: args.url,
	  }
		  links.push(link)
	    return link
    },
  
    updateLink: (root,args) => {
      let linkToBeUpdated = links.find(link => {
        return link.id === args.id
      })
      if(args.description){
        linkToBeUpdated.description = args.description
      }
      if(args.url) {
        linkToBeUpdated.url = args.url
      }
      return linkToBeUpdated
    },

    deleteLink: (root, args) => {
      return links = links.filter(link => {
        return link.id !== args.id
      })

    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))