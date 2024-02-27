import { CardContent, Grid, Icon, Paper, Typography } from '@mui/material'
import MDBox from 'components/MDBox'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const exercises = [
	{
		id: 1,
		title: 'Inclined Bench Press',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 2,
		title: 'Push ups',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-2.png'
	},
	{
		id: 3,
		title: 'Clap Push ups',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-3.png'
	},
	{
		id: 4,
		title: 'Dumbell Bench Flys',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-4.png'
	},
	{
		id: 5,
		title: 'Bench Press',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-5.png'
	},
	{
		id: 6,
		title: 'Dumbell Bench Press',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-6.png'
	},
	{
		id: 7,
		title: 'Dumbell Flys',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-7.png'
	},
]

const selectedExercises = [

	{
		id: 1,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 2,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 3,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 4,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 5,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 6,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 7,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 8,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
	{
		id: 9,
		title: 'Chest',
		description: 'Upper body push and pull exercises',
		thumbnail: '/img/chest-1.png'
	},
]


const Exercises = () => {



	const onDragEnd = (result) => {
		console.log('result', result);
		if (!result.destination) return; // dropped outside the list

	};

	return (
		<DashboardLayout>
			<DashboardNavbar />

			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				<Droppable
					droppableId="board"
					direction="vertical"
					className="image-list"
				>
					{(provided) => (
						<div
						>
							<MDBox py={3}>
								<Grid container spacing={2}>
									<Grid item xs={9}>
										<Paper className='p-8'>
											<Grid container spacing={4}>
												{selectedExercises.map(row => (
													<Grid key={row.id} item xs={4} className='grid justify-center items-center'>
														<Paper
															{...provided.droppableProps}
															ref={provided.innerRef}
															variant='outlined'
															className='grid items-center justify-center w-[180px] h-[180px]'
														>
															<Icon className='text-gray-300' fontSize="small">add</Icon>
														</Paper>

													</Grid>
												))}
											</Grid>

										</Paper>
									</Grid>
									<Grid item xs={3}>
										<Paper className='p-2'>
											<div className='overflow-y-auto max-h-[80.2vh]'>
												{exercises.map((row, index) => (
													<Draggable
														key={row.id} draggableId={String(row.id)} index={index}>
														{(provided, snapshot) => (
															<div
																className="image-item"
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<MDBox mb={1.5}>
																	<Paper variant='outlined' className='cursor-pointer border-1'>
																		<div className='flex justify-center p-4 pb-0'>
																			<img src={row.thumbnail} className="w-1/2" />
																		</div>
																		<CardContent>
																			<Typography gutterBottom variant="h5" component="div">
																				{row.title}
																			</Typography>
																			<Typography variant="caption" color="text.secondary">
																				{row.description}
																			</Typography>
																		</CardContent>
																	</Paper>
																</MDBox>
															</div>
														)}
													</Draggable>
												))}
											</div>
										</Paper>
									</Grid>
								</Grid>
							</MDBox>

							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<Footer />
		</DashboardLayout>
	)
}

export default Exercises