
//mongoose models

const Project = require('../model/Project');
const Client = require('../model/Client')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require('graphql')

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id:{
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }, 
        phone: {
            type: GraphQLString
        }
    })
});

//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id:{
            type: GraphQLID
        },
        clientId: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }, 
        description: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find((client)=>{
                     client.id === parent.clientId    
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: {
                clientId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args){
                return clients.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
   query: RootQuery 
})