import React, { useState } from 'react';
import { Grid, Box, Typography, Fab, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Backdrop } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { SpinnerRoundFilled } from 'spinners-react';
import { useQuery, gql } from '@apollo/client';
import Typed from 'react-typed';
import SideBar from '../components/sideBar';
import NewTask from '../components/Tasks/newTask';
import ListTasks from '../components/Tasks/listTasks';

const useStyles = makeStyles((_theme:Theme)=> createStyles({
    backdrop: {
        zIndex: _theme.zIndex.drawer + 1,
    },
    styleList:{
        minWidth: '100%'
    }
}));

const GET_TASKS = gql`
    query getAllTasks{
        getAllTasks{
            id
            title
  	        min
            sec
            description
            status
            time
        }
    }
`;


const Tasks = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const { data, loading } = useQuery(GET_TASKS);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    if(loading)
    return(
        <Backdrop className={classes.backdrop} open={loading}>
            <SpinnerRoundFilled size={100} thickness={180} speed={100} color="#0047BA" />
        </Backdrop>
    );

    const tasks = data.getAllTasks;

    return (
        <SideBar>
            <Grid container spacing={5}>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography variant="h4" color="textPrimary">
                                <Typed
                                    strings={[`Tareas`, 'Crear Tarea', 'Iniciar Tarea']}
                                    typeSpeed={80}
                                    backSpeed={90}
                                    loop
                                />
                            </Typography>
                        </Box>
                        <Box>
                            <Tooltip title="Agregar" arrow placement="bottom-end">
                                <Fab size="large" color="primary" aria-label="add" onClick={handleClickOpen} >
                                    <Add />
                                </Fab>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="column" justify="flex-start" alignItems="flex-start" >
                <Grid item className={classes.styleList} >
                    <ListTasks tasks={tasks} />
                </Grid>
            </Grid>
            </Grid>
            <NewTask open={open} handleClose={handleClose} />
        </SideBar>
    );
};

export default Tasks;


