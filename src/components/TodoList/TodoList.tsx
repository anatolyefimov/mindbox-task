import React, { useContext } from 'react'

import { Box, List, ListItem, Text } from '@chakra-ui/react'

import TodoItem from '@/components/TodoItem'
import { AppContext } from '@/context/AppContext'

const TodoList: React.FC = () => {
	const {
		state: { editId },
		getFilteredTodos,
	} = useContext(AppContext)

	const todos = getFilteredTodos()

	if (!todos || todos.length === 0) {
		return (
			<Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
				<Text fontSize="xl" color="lightgray">
					List is empty
				</Text>
			</Box>
		)
	}

	return (
		<List spacing={3}>
			{todos.map((todo) => (
				<ListItem key={todo.id}>
					<TodoItem todo={todo} isEditing={editId === todo.id} />
				</ListItem>
			))}
		</List>
	)
}

export default TodoList
