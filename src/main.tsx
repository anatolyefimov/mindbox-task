import React from 'react'

import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import { AppProvider } from './context/AppContext/AppContext.tsx'
import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AppProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</AppProvider>
	</React.StrictMode>,
)
