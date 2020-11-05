import { useEffect, useState}  from 'react';
import { Backdrop, Grid, Box, Typography, IconButton} from '@material-ui/core';
import { List, ListItem, ListItemText, Avatar, ListItemAvatar, ListItemSecondaryAction, } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Done, Delete } from '@material-ui/icons';
import { SpinnerRoundFilled } from 'spinners-react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Typed from 'react-typed';
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
    styleSecondaryText:{
        color:'#000000'
    }
}));

const GET_ALL = gql`
    query getAll{
        getAll{
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

const DELETE_TASK = gql`
    mutation deleteTask($input:TaskId!){
        deleteTask(input:$input){
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

const TasksCompletes = () => {
    const classes = useStyles();
    const { data, loading } = useQuery(GET_ALL);
    const [ deleteTask ] = useMutation(DELETE_TASK, {
        update(cache, { data: { deleteTask } }){
            const { getAll } = cache.readQuery({ query: GET_ALL });
            cache.writeQuery({
                query: GET_ALL,
                data:{
                    getAll: getAll.filter((task:any):any => task.id !== deleteTask.id)
                }
            });
        }
    });

    if(loading)
    return(
        <Backdrop className={classes.backdrop} open={loading}>
            <SpinnerRoundFilled size={100} thickness={180} speed={100} color="#0047BA" />
        </Backdrop>
    );

    const tasks = data.getAll;

    return (
        <SideBar>
            <Grid container spacing={5}>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography variant="h4" color="textPrimary">
                                <Typed
                                    strings={[`Tareas Completas`, `Eliminar Tarea`]}
                                    typeSpeed={80}
                                    backSpeed={90}
                                    loop
                                />
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} container direction="column" justify="flex-start" alignItems="flex-start" >
                <Box className={classes.styleList} width="80%" mx="auto">
                    <List dense={false}>
                        {tasks.map((item:any):any => !item.status &&
                            <ListItem key={item.id} divider={true} >
                                <ListItemText
                                    primary={item.title}
                                    secondary={`Descripción: ${item.description} - Se completó en: ${item.time}:00 min`}
                                    classes={{secondary:classes.styleSecondaryText}}
                                />
                                <ListItemAvatar>
                                    <Avatar>
                                        <Done />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemSecondaryAction>
                                  <IconButton onClick={()=> deleteTask({variables:{input: {id:item.id}}})} >
                                    <Delete />
                                  </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Grid>
            </Grid>
        </SideBar>
    );
};

export default TasksCompletes;