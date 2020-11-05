import React, { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { Button, Typography, TextField, Grid, Select, FormControl, InputLabel, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import theme from '../_theme';

const useStyles = makeStyles((_theme:Theme)=> createStyles({
    colorLabel:{
        color:'#000000'
    }
}));

const CREATE_TASK = gql`
    mutation($input:TaskInput!){
	    createTask(input:$input){
            id
            title
  	        min
            sec
            description
        }
    }
`;

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
`

const NewTask = (props:any) => {
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [ createTask ] = useMutation(CREATE_TASK,{
        update(cache, { data: { createTask } }){
            const { getAllTasks } = cache.readQuery({ query: GET_TASKS });
            cache.writeQuery({
                query: GET_TASKS,
                data:{
                    getAllTasks:[
                        ...getAllTasks,
                        createTask
                    ]
                }
            });
        }
    });

    const saveTask = async() =>{
        const title = (document.querySelector('#txtTitle')!as HTMLInputElement).value;
        const min = parseInt((document.querySelector('#slcDuration')!as HTMLInputElement).value);
        const description = (document.querySelector('#txtDescription')!as HTMLInputElement).value;

        if(!(title==="" || min===0 || description==="")){
            const { data } = await createTask({
                variables:{
                    input: {
                        title,
                        min:min-1,
                        sec:59,
                        description,
                    }
                }
            });
            (data.createTask)?props.handleClose():console.log("Error") 
        }
    }

    return (
        <Dialog fullScreen={fullScreen} open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Nueva Tarea
            </DialogTitle>
            <DialogContent>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs>
                    <DialogContentText classes={{root:classes.colorLabel}}>
                        Ingresa un titulo, selecciona una duración y escribe una descripción
                    </DialogContentText>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item xs>
                    <TextField 
                        fullWidth
                        id="txtTitle"
                        label="Titulo"
                        variant="outlined"
                        InputLabelProps={{
                            classes:{root:classes.colorLabel}
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <FormControl variant="outlined" fullWidth >
                    <InputLabel htmlFor="slcDuration" className={classes.colorLabel}>Duración</InputLabel>
                    <Select
                        native
                        fullWidth
                        label="Duración"
                        defaultValue={0}
                        inputProps={{
                            id: 'slcDuration',
                        }}
                    >
                      <option value={0} disabled>Seleciona Duración</option>
                      <option value={30}>Corta 30 min.</option>
                      <option value={45}>Media 45 min.</option>
                      <option value={60}>Larga 60 min.</option>
                    </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Box pt={3}>  
            <Grid container direction="row" justify="flex-start" alignItems="center">          
            <TextField
                id="txtDescription"
                label="Descripción"
                multiline
                fullWidth
                rows={2}
                defaultValue=""
                variant="outlined"
                InputLabelProps={{
                    classes:{root:classes.colorLabel}
                }}
            />
            </Grid>
            </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={props.handleClose}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={saveTask}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default NewTask;