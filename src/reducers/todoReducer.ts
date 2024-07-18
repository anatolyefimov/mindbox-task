export interface Todo {
	id: string
	text: string
	isCompleted: boolean
}

export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'

export type State = {
	todos: Todo[]
	editId: string | null
	filter: FilterType
}

export type Action =
	| { type: 'ADD_TODO'; payload: { id: string; text: string } }
	| { type: 'DELETE_TODO'; payload: string }
	| { type: 'TOGGLE_COMPLETE'; payload: string }
	| { type: 'SET_EDIT_ID'; payload: string }
	| { type: 'SAVE_TODO'; payload: string }
	| { type: 'LOAD_TODOS'; payload: Todo[] }
	| { type: 'SET_FILTER'; payload: FilterType }

export const initialState: State = {
	todos: [],
	editId: null,
	filter: 'ALL',
}

export const todoReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [
					...state.todos,
					{
						id: action.payload.id,
						text: action.payload.text,
						isCompleted: false,
					},
				],
			}
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			}
		case 'TOGGLE_COMPLETE':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload
						? { ...todo, isCompleted: !todo.isCompleted }
						: todo,
				),
			}
		case 'SET_EDIT_ID': {
			return {
				...state,
				editId: action.payload,
			}
		}

		case 'SAVE_TODO':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === state.editId ? { ...todo, text: action.payload } : todo,
				),
				editId: null,
			}
		case 'LOAD_TODOS':
			return {
				...state,
				todos: action.payload,
			}
		case 'SET_FILTER':
			return {
				...state,
				filter: action.payload,
			}
		default:
			return state
	}
}
