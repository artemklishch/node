const { buildSchema } = require("graphql");

// module.exports = buildSchema(`
//     type Query{
//         test: String!
//     }
// `) //строка здесь должна быть в обратных кавычках
// test: String! - восклицательный знач означает, что тп данных обязательный.
// test: String! - функция, возвращающая строку
// Query - означает запрос

module.exports = buildSchema(`
    type User{
        name: String!
        email: String!
        age: Int!
    }
    type TestType{
        count: Int!
        users: [User!]!
    }
    type Todo{
        id: ID!
        done: Boolean!
        title: String!
        createdAt: String
        updatedAt: String
    }
    type Query{
        test: TestType!
        random(min: Int!, max: Int!, count: Int!): [Float!]!
        getTodos: [Todo!]!
    }

    input UserInput{
        name: String!
        email: String!
    }
    input TodoInput{
        title: String!
    }
    type Mutation{
        addTestUser(user: UserInput!): User!
        createTodo(todo: TodoInput): Todo!
        completeTodo(id: ID!): Todo!
        deleteTodo(id: ID!): Boolean!
    }
`);
