import React, {
	PropsWithChildren,
	useEffect,
	useReducer,
	useState,
} from 'react'

import { v4 as uuidv4 } from 'uuid'

import {
	FilterType,
	initialState,
	State,
	Todo,
	todoReducer,
} from '@/reducers/todoReducer'

interface IAppContext {
	state: State
	handleAddTodo: (text: string) => void
	handleToggleComplete: (id: string) => void
	handleDeleteTodo: (id: string) => void
	handleEditTodo: (id: string) => void
	handleSaveTodo: (text: string) => void
	handleFilterChange: (filter: FilterType) => void
	getFilteredTodos: () => Todo[]
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext)

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, initialState)
	const [isInitialLoad, setIsInitialLoad] = useState(true)

	useEffect(() => {
		const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
		console.log(savedTodos)
		if (savedTodos.length) {
			dispatch({ type: 'LOAD_TODOS', payload: savedTodos })
		}
		setIsInitialLoad(false)
	}, [])

	useEffect(() => {
		if (!isInitialLoad) {
			localStorage.setItem('todos', JSON.stringify(state.todos))
		}
	}, [state.todos, isInitialLoad])

	const handleAddTodo: IAppContext['handleAddTodo'] = (text) => {
		dispatch({ type: 'ADD_TODO', payload: { id: uuidv4(), text } })
	}

	const handleToggleComplete: IAppContext['handleToggleComplete'] = (id) => {
		dispatch({ type: 'TOGGLE_COMPLETE', payload: id })
	}

	const handleDeleteTodo: IAppContext['handleDeleteTodo'] = (id) => {
		dispatch({ type: 'DELETE_TODO', payload: id })
	}

	const handleEditTodo: IAppContext['handleEditTodo'] = (id) => {
		dispatch({ type: 'SET_EDIT_ID', payload: id })
	}

	const handleSaveTodo: IAppContext['handleSaveTodo'] = (text) => {
		dispatch({ type: 'SAVE_TODO', payload: text })
	}

	const handleFilterChange: IAppContext['handleFilterChange'] = (filter) => {
		dispatch({ type: 'SET_FILTER', payload: filter })
	}

	const getFilteredTodos: IAppContext['getFilteredTodos'] = () => {
		switch (state.filter) {
			case 'COMPLETED':
				return state.todos.filter((todo) => todo.isCompleted)
			case 'ACTIVE':
				return state.todos.filter((todo) => !todo.isCompleted)
			default:
				return state.todos
		}
	}

	return (
		<AppContext.Provider
			value={{
				state,
				handleAddTodo,
				handleToggleComplete,
				handleDeleteTodo,
				handleEditTodo,
				handleSaveTodo,
				handleFilterChange,
				getFilteredTodos,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
