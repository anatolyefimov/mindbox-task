import React, { useContext, useState } from 'react'

import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { AppContext } from '@/context/AppContext/AppContext'

const AddTodoForm: React.FC = () => {
	const { handleAddTodo } = useContext(AppContext)

	const [newTodo, setNewTodo] = useState('')

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setNewTodo(e.target.value)
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (newTodo.trim() !== '') {
			handleAddTodo(newTodo)
			setNewTodo('')
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex mb={4} gap={2}>
				<FormControl>
					<FormLabel htmlFor="new-todo" srOnly>
						Add a new todo
					</FormLabel>
					<Input
						id="new-todo"
						type="text"
						value={newTodo}
						onChange={handleInputChange}
						placeholder="Add a new todo"
						mr={2}
					/>
				</FormControl>
				<Button type="submit" colorScheme="teal">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default AddTodoForm
