import React, {useState, useEffect} from 'react';
import { Card, CardContent, Typography, Box, Divider, IconButton, Tooltip} from '@material-ui/core';
import { PlayArrow, Pause, DoneAll} from '@material-ui/icons';
import { useMutation, gql, useLazyQuery } from '@apollo/client';

const UPDATE_TIME = gql`
    mutation updateTime($input:TimeInput!){
        updateTime(input:$input){
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


const GET_TASK = gql`
    query getTask($input:TaskId!){
        getTask(input:$input){
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

const CardTimer = (props:any) => {
    const [Task, { data, loading, error }] = useLazyQuery(GET_TASK);
    const [ updateTime ] = useMutation(UPDATE_TIME);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [play, setPlay] = useState(false);

    const handlePlay = () => setPlay(!play);


    useEffect(() => {
        if(props.info){
            const { id } = props.info;
            setId(id);
            Task({ variables:{ input:{ id } }});
            setPlay(false);
        }
    },[props.info])

    useEffect(() => {
        if(data){
            const { title, description, min, sec} = data.getTask;
            setTitle(title);
            setDescription(description);
            setMin(min);
            setSec(sec);
        }
    },[loading, data])

    useEffect(() => {
        let interval = null;
        if(play){
            interval = setInterval(() => {
                setSec(sec => sec - 1);
            },  1000);
            updateTime({
                variables:{
                    input: {
                        id,
                        sec,
                        min
                    }
                }
            });
            if(sec <= 0){ 
              setMin(min => min - 1);
              setSec(59);
            }
            if(min < 0 && sec == 59){
                setPlay(false);
                props.update({
                    variables:{
                        input: {
                            id
                        }
                    }
                });
            }
        }else if (!play) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[play, sec])


    const handleUpdate = () => {
        props.update({variables:{ input: { id } }});
    }

    return (
        <Card>
            <CardContent>
                <Box display="flex" pb={1} alignItems="center" >
                    <Box width="100%">
                        <Typography component="h4" variant="h4">
                            Tarea en Curso
                        </Typography>
                    </Box>
                    <Box flexShrink={1}>
                        <Tooltip title="Finalizar" arrow placement="right-start">
                            <IconButton onClick={handleUpdate}>
                                <DoneAll fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Divider />
                <Box display="flex" pt={1} alignItems="center">
                    <Box width="100%">
                        <Typography component="h5" variant="h5">
                            {title}
                        </Typography>
                    </Box>
                    <Box flexShrink={1}>
                        <Typography component="h5" variant="h5">
                            {`${(min.toString().length === 1)?"0":""}${min}:${(sec.toString().length === 1)?"0":""}${sec}`}
                        </Typography>
                    </Box>
                    <Box flexShrink={2}>
                        <Tooltip title={(play)?"Pausar":"Iniciar"} arrow placement="right-start">
                            <IconButton onClick={handlePlay}>
                                {(play)?<Pause />:<PlayArrow />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box display="flex" pt={1} ml={1}>
                    <Box width="100%">
                        <Typography variant="subtitle1" gutterBottom>
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardTimer;