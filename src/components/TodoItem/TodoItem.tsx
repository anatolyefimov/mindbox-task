import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Box,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Text,
} from '@chakra-ui/react'

import { AppContext } from '@/context/AppContext'
import { Todo } from '@/reducers/todoReducer'

type TodoItemProps = {
	todo: Todo
	isEditing: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, isEditing }) => {
	const { handleToggleComplete } = useContext(AppContext)

	return (
		<Flex alignItems="center" gap={2} maxWidth={'100%'}>
			<Checkbox
				isChecked={todo.isCompleted}
				onChange={() => handleToggleComplete(todo.id)}
			/>
			{isEditing ? (
				<TodoItemEditing todo={todo} />
			) : (
				<TodoItemDefault todo={todo} />
			)}
		</Flex>
	)
}

const TodoItemEditing: React.FC<Pick<TodoItemProps, 'todo'>> = ({ todo }) => {
	const { handleSaveTodo } = useContext(AppContext)

	const [editText, setEditText] = useState(todo.text)

	const handleSaveEdit = (e: FormEvent) => {
		e.preventDefault()
		handleSaveTodo(editText)
	}

	const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEditText(e.target.value)
	}

	return (
		<Box
			as={'form'}
			onSubmit={handleSaveEdit}
			display={'flex'}
			alignItems={'center'}
			flexGrow={1}
			gap={2}
		>
			<FormControl>
				<FormLabel htmlFor={`edit-todo-${todo.id}`} srOnly>
					Edit todo
				</FormLabel>
				<Input
					id={`edit-todo-${todo.id}`}
					type="text"
					value={editText}
					onChange={handleEditChange}
				/>
			</FormControl>
			<IconButton
				icon={<CheckIcon />}
				colorScheme="teal"
				type="submit"
				aria-label="save"
			/>
		</Box>
	)
}

const TodoItemDefault: React.FC<Pick<TodoItemProps, 'todo'>> = ({ todo }) => {
	const { handleEditTodo, handleDeleteTodo } = useContext(AppContext)

	return (
		<Flex gap={2} alignItems={'center'} grow={1} overflow={'hidden'}>
			<Text
				flex="1"
				textDecoration={todo.isCompleted ? 'line-through' : 'none'}
				overflow={'hidden'}
				textOverflow={'ellipsis'}
				whiteSpace={'nowrap'}
			>
				{todo.text}
			</Text>
			<IconButton
				icon={<EditIcon />}
				colorScheme="yellow"
				aria-label="edit"
				onClick={() => handleEditTodo(todo.id)}
			/>
			<IconButton
				icon={<DeleteIcon />}
				colorScheme="red"
				aria-label="delete"
				onClick={() => handleDeleteTodo(todo.id)}
			/>
		</Flex>
	)
}

export default TodoItem
