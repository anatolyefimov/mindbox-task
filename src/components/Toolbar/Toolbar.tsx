import React, { useContext } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'

import { AppContext } from '@/context/AppContext'

const Toolbar: React.FC = () => {
	const { state, handleFilterChange } = useContext(AppContext)

	return (
		<ButtonGroup
			mt={4}
			width={'full'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Button
				onClick={() => handleFilterChange('ALL')}
				isActive={state.filter === 'ALL'}
			>
				All
			</Button>
			<Button
				onClick={() => handleFilterChange('ACTIVE')}
				isActive={state.filter === 'ACTIVE'}
			>
				Active
			</Button>
			<Button
				onClick={() => handleFilterChange('COMPLETED')}
				isActive={state.filter === 'COMPLETED'}
			>
				Completed
			</Button>
		</ButtonGroup>
	)
}

export default Toolbar
