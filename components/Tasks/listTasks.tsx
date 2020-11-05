import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { UnfoldMore } from '@material-ui/icons';
import { ReactSortable } from "react-sortablejs";
import { gql, useMutation } from '@apollo/client';
import CardTimer from './cardTimer';


const useStyles = makeStyles((_theme:Theme)=> createStyles({
    styleList: {
        backgroundColor: _theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: '18px 18px 20px #D1D9E6, -18px -18px 20px #F2F2F2'
    },
    styleSecondaryText:{
        color:'#000000'
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

const UPDATE_STATUS = gql`
    mutation updateStatus($input:TaskId!){
        updateStatus(input:$input){
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

const ListTasks = (props:any) => {
    const classes = useStyles();
    const [state, setState] = useState([]);
    const [ updateStatus ] = useMutation(UPDATE_STATUS, {
        update(cache, { data: { updateStatus } }){
            const { getAllTasks } = cache.readQuery({ query: GET_TASKS });
            cache.writeQuery({
                query: GET_TASKS,
                data:{
                    getAllTasks: getAllTasks.filter((task:any):any => task.id !== updateStatus.id)
                }
            });
        }
    });

    useEffect(() => {
        const tasks = props.tasks;
        if(state.length == 0){
            setState(tasks);
        }
        else if(state.length < tasks.length){
            setState([
                ...state,
                tasks[tasks.length - 1 ]
            ])
        }
        else if(state.length > tasks.length){
            setState(tasks);
        }
    },[props.tasks])

    return (
        <Box>
            <Box pb={2} boxShadow={3} width="50%" mx="auto">
                <CardTimer info={state[0]} update={updateStatus} />
            </Box>
            <Box className={classes.styleList} width="80%" mx="auto">
                <List dense={false}>
                    <ReactSortable list={state} setList={setState} >
                        {state.map((item) => (
                            <ListItem key={item.id} divider={true} >
                                <ListItemText
                                    primary={item.title}
                                    secondary={`Descripción: ${item.description} - Duración: ${item.min + 1}:00 min`}
                                    classes={{secondary:classes.styleSecondaryText}}
                                />
                                <ListItemAvatar>
                                    <Avatar>
                                        <UnfoldMore />
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItem>
                        ))}
                    </ReactSortable>
                </List>
            </Box>
        </Box>
    )
};

export default ListTasks;