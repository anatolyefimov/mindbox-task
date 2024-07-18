import React from 'react'

import { Box, Text } from '@chakra-ui/react'

import AddTodoForm from '@/components/AddTodoForm'
import TodoList from '@/components/TodoList'
import Toolbar from '@/components/Toolbar'

const TodoApp: React.FC = () => {
	return (
		<Box p={5} maxWidth="600px" margin="0 auto">
			<Text fontSize="3xl" mb={4} width={'full'} textAlign={'center'}>
				Todo List
			</Text>
			<AddTodoForm />
			<TodoList />
			<Toolbar />
		</Box>
	)
}

export default TodoApp
