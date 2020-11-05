import { gql } from '@apollo/client'

export const typeDefs = gql`
	input TaskInput {
		title: String!
		min: Int!
		sec: Int!
		description: String!
	}
	input TimeInput {
		id: ID!
		min: Int!
		sec: Int!
	}
	input TaskId {
		id: ID!
	}
	type Task {
		id: ID
		title: String
		min: Int
		sec: Int
		description: String
		status: Boolean
		time: Int
	}
	type User {
    	id: ID
    	name: String
    	status: String
  	}
  	type Query {
    	getTask(input: TaskId!): Task
		getAllTasks: [Task]
		getAll: [Task]
		getCounts: [Int]
	}
	type Mutation {
		createTask(input: TaskInput!): Task
		deleteTask(input: TaskId!): Task
		updateTime(input: TimeInput!): Task
		updateStatus(input: TaskId!): Task
	}
`