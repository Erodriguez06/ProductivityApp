import { Backdrop, Grid, Box, Typography, Card, CardContent, Button} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Typed from 'react-typed';
import { ComposedChart, ReferenceLine, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SpinnerRoundFilled } from 'spinners-react';
import { useQuery, gql } from '@apollo/client';
import SideBar from '../components/sideBar';


const useStyles = makeStyles((_theme:Theme)=> createStyles({
    backdrop: {
        zIndex: _theme.zIndex.drawer + 1,
	},
	styleList: {
        backgroundColor: _theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: '18px 18px 20px #D1D9E6, -18px -18px 20px #F2F2F2'
    },
}));

const GET_INFO = gql`
	query{
  		getAll{
    		title
    		status
			min
    		time
  		}
		getCounts
	}
`;

const Index = () => {
	const classes = useStyles()
	const { data, loading, refetch } = useQuery(GET_INFO);

	if(loading)
    return(
        <Backdrop className={classes.backdrop} open={loading}>
            <SpinnerRoundFilled size={100} thickness={180} speed={100} color="#0047BA" />
        </Backdrop>
	);
	
	const { getAll, getCounts} = data;

	const filtered = getAll.map((task:any):any => {
		return { ...task, Hecha:(task.status)?0:task.time, Pendiente:(task.status)?task.time*-1:0}
	});

	return (
		<SideBar>
    	<Grid container spacing={5}>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography variant="h4" color="textPrimary">
                                <Typed strings={[`Aplicación Productividad`]} typeSpeed={80} />
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
			<Grid item xs={12} container direction="row" justify="center" alignItems="center" >
				<Box mx="auto">
					<Card variant="outlined" className={classes.styleList}>
						<CardContent>
							<Typography variant="h5" color="textPrimary">
								Pendientes 
							</Typography>
							<Box display="flex" justifyContent="center">
								<Typography variant="h5" color="textPrimary">
									{getCounts[1]}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Box>
				<Box mx="auto">
					<Card variant="outlined" className={classes.styleList}>
						<CardContent>
							<Typography variant="h5" color="textPrimary">
								Completadas
							</Typography>
							<Box display="flex" justifyContent="center">
								<Typography variant="h5" color="textPrimary">
									{getCounts[2]}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Box>
				<Box mx="auto">
					<Card variant="outlined" className={classes.styleList}>
						<CardContent>
							<Typography variant="h5" color="textPrimary">
								Total
							</Typography>
							<Box display="flex" justifyContent="center">
								<Typography variant="h5" color="textPrimary">
									{getCounts[0]}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</Box>
				<Box mx="auto">
					<Button variant="outlined" color="secondary" onClick={()=> refetch()}>
						ACTUALIZAR
					</Button>
				</Box>
			</Grid>
			<Grid item xs={12} container direction="row" justify="center" alignItems="flex-start" >
				<Grid item>
				<Box display="flex" pt={1} alignItems="center">
					<Box width="100%">
						<ComposedChart width={600} height={400} data={filtered} margin={{ top: 20, right: 20, bottom: 20, left: 20, }} >
        					<CartesianGrid stroke="#E5F0FF" />
        					<XAxis dataKey="title" />
        					<YAxis />
        					<Tooltip />
        					<Legend />
        					<ReferenceLine y={0} stroke="#000" />
        					<Bar dataKey="Hecha" fill="#8884d8" />
        					<Bar dataKey="Pendiente" fill="#82ca9d" />
      					</ComposedChart>
					</Box>
				</Box>
				</Grid>
			</Grid>
        </Grid>
		</SideBar>
  	)
}

export default Index