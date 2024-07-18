import React, { ReactElement } from 'react'

import { afterEach, expect } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import {
	cleanup,
	fireEvent,
	render as rtlRender,
	RenderOptions,
	screen,
} from '@testing-library/react'

import { AppProvider } from './context/AppContext'
import TodoApp from './App'

function render(ui: ReactElement, options?: RenderOptions) {
	function Wrapper({ children }: { children?: React.ReactNode }) {
		return (
			<AppProvider>
				<ChakraProvider>{children}</ChakraProvider>
			</AppProvider>
		)
	}

	return rtlRender(ui, { wrapper: Wrapper, ...options })
}

describe('TodoApp', () => {
	afterEach(() => {
		cleanup()
		localStorage.clear()
	})

	test('renders TodoApp component', () => {
		render(<TodoApp />)
		expect(screen.getByText('Todo List')).toBeInTheDocument()
	})

	test('adds a new todo', () => {
		render(<TodoApp />)

		const input = screen.getByPlaceholderText('Add a new todo')
		const addButton = screen.getByText('Add')

		fireEvent.change(input, { target: { value: 'New Todo' } })
		fireEvent.click(addButton)

		expect(screen.getByText('New Todo')).toBeInTheDocument()
	})

	test('edits a todo', () => {
		render(<TodoApp />)

		const input = screen.getByPlaceholderText('Add a new todo')
		const addButton = screen.getByText('Add')

		fireEvent.change(input, { target: { value: 'Todo to be edited' } })
		fireEvent.click(addButton)

		// Verify the todo is added
		expect(screen.getByText('Todo to be edited')).toBeInTheDocument()

		// Click the edit button
		const editButton = screen.getByLabelText('edit')
		fireEvent.click(editButton)

		// Change the text
		const editInput = screen.getByDisplayValue('Todo to be edited')
		fireEvent.change(editInput, { target: { value: 'Edited Todo' } })
		const saveButton = screen.getByLabelText('save')
		fireEvent.click(saveButton)

		// Verify the todo is edited
		expect(screen.queryByText('Todo to be edited')).not.toBeInTheDocument()
		expect(screen.getByText('Edited Todo')).toBeInTheDocument()
	})

	test('deletes a todo', () => {
		render(<TodoApp />)

		const input = screen.getByPlaceholderText('Add a new todo')
		const addButton = screen.getByText('Add')

		fireEvent.change(input, { target: { value: 'Todo to be deleted' } })
		fireEvent.click(addButton)

		// Verify the todo is added
		expect(screen.getByText('Todo to be deleted')).toBeInTheDocument()

		// Click the delete button
		const deleteButton = screen.getByLabelText('delete')
		fireEvent.click(deleteButton)

		// Verify the todo is deleted
		expect(screen.queryByText('Todo to be deleted')).not.toBeInTheDocument()
	})

	test('toggles todo completion', () => {
		render(<TodoApp />)

		const input = screen.getByPlaceholderText('Add a new todo')
		const addButton = screen.getByText('Add')

		fireEvent.change(input, { target: { value: 'New Todo' } })
		fireEvent.click(addButton)

		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)

		expect(screen.getByText('New Todo')).toHaveStyle(
			'text-decoration: line-through',
		)

		fireEvent.click(checkbox)

		expect(screen.getByText('New Todo')).not.toHaveStyle(
			'text-decoration: line-through',
		)
	})

	test('filters todos', () => {
		render(<TodoApp />)

		const input = screen.getByPlaceholderText('Add a new todo')
		const addButton = screen.getByText('Add')

		fireEvent.change(input, { target: { value: 'Active Todo' } })
		fireEvent.click(addButton)

		fireEvent.change(input, { target: { value: 'Completed Todo' } })
		fireEvent.click(addButton)

		const checkboxes = screen.getAllByRole('checkbox')
		fireEvent.click(checkboxes[1])

		const allFilter = screen.getByText('All')
		const activeFilter = screen.getByText('Active')
		const completedFilter = screen.getByText('Completed')

		fireEvent.click(activeFilter)
		expect(screen.getByText('Active Todo')).toBeInTheDocument()
		expect(screen.queryByText('Completed Todo')).not.toBeInTheDocument()

		fireEvent.click(completedFilter)
		expect(screen.queryByText('Active Todo')).not.toBeInTheDocument()
		expect(screen.getByText('Completed Todo')).toBeInTheDocument()

		fireEvent.click(allFilter)
		expect(screen.getByText('Active Todo')).toBeInTheDocument()
		expect(screen.getByText('Completed Todo')).toBeInTheDocument()
	})
})
