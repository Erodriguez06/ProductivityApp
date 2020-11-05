import React, {useState} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, Avatar } from '@material-ui/core';
import { Container, Grid, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Menu, Home, FormatListBulleted, PlaylistAddCheck } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((_theme:Theme)=> createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
      transition: _theme.transitions.create(['margin', 'width'], {
        easing: _theme.transitions.easing.sharp,
        duration: _theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: _theme.transitions.create(['margin', 'width'], {
          easing: _theme.transitions.easing.easeOut,
          duration: _theme.transitions.duration.enteringScreen,
        }),
    },
    menuBtnSpacing:{
        marginRight: _theme.spacing(2),
    },
    styleSideBarHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: _theme.spacing(0, 1),
        // necessary for content to be below app bar
        ..._theme.mixins.toolbar,
        justifyContent: 'center',
    },
    styleSideBar: {
        width: drawerWidth,
        flexShrink: 0,
    },
    styleColorAppBar:{
        background: 'linear-gradient(20deg, #402ab2 20%, #b050c8 45%, #ff7470 100%)'
    },
    styleSideBarPaper: {
        width: drawerWidth,
        background: 'linear-gradient(30deg, rgba(2,0,36,1) 0%, rgba(2,117,140,1) 23%, rgba(64,42,178,1) 58%)'
    },
    styleDivider:{
        backgroundColor: "white"
    },
    styleTitleBar: {
        flexGrow: 1,
        fontFamily: 'Lobster',
        color: 'white',
        cursor: 'pointer'
    },
    styleAvatar:{
        width: _theme.spacing(15),
        height: _theme.spacing(15),
        margin: "4em 0 1em 0"
    },
    styleSelectItem:{
        backgroundColor: '#2C027A',
        '&:hover':{
            backgroundColor: '#2C027A',
        }
    },
    content: {
        flexGrow: 1,
        paddingTop: _theme.spacing(10),
        transition: _theme.transitions.create('margin', {
          easing: _theme.transitions.easing.sharp,
          duration: _theme.transitions.duration.leavingScreen,
        }),
        maxWidth: "100%",
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: _theme.transitions.create('margin', {
          easing: _theme.transitions.easing.easeOut,
          duration: _theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        maxWidth: "100%"
    },
}));

const SideBar = (props:any) => {
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const handleSideBarOpen = () => setOpen(!open);
    
    return (
        <Box className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,}, classes.styleColorAppBar)}>
              <Toolbar >
                <IconButton onClick={handleSideBarOpen} edge="start" className={classes.menuBtnSpacing} color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Link href="/">
                <Typography variant="h4" className={classes.styleTitleBar}>
                    Productividad
                </Typography>
                </Link>
              </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open} className={classes.styleSideBar} classes={{paper: classes.styleSideBarPaper}} >
                <Container fixed className={classes.styleSideBarHeader}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Avatar alt="Avatar" className={classes.styleAvatar}/>
                        <Typography variant="h4" className={classes.styleTitleBar}>
                            Bienvenido
                        </Typography>
                    </Grid>
                </Container>
                <Divider className={classes.styleDivider}/>
                <Box pt={2} color="text.secondary">
                    <List component="nav" aria-label="menu">
                    <Link href="/">
                        <ListItem button className={router.pathname==='/'?classes.styleSelectItem:""}>
                            <ListItemIcon>
                                <Home htmlColor='white' />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItem>
                    </Link>
                    <Link href="/Tasks">
                        <ListItem button className={router.pathname==='/Tasks'?classes.styleSelectItem:""}>
                            <ListItemIcon>
                                <FormatListBulleted htmlColor='white' />
                            </ListItemIcon>
                            <ListItemText primary="Tareas" />
                        </ListItem> 
                    </Link>
                    <Link href="/TasksCompletes">
                        <ListItem button className={router.pathname==='/TasksCompletes'?classes.styleSelectItem:""}>
                            <ListItemIcon>
                                <PlaylistAddCheck htmlColor='white' />
                            </ListItemIcon>
                            <ListItemText primary="Completadas" />
                        </ListItem> 
                    </Link>
                    </List>
                </Box>
            </Drawer>
            <Container fixed className={clsx(classes.content, {[classes.contentShift]: open,})}>
                <Box className={classes.styleSideBarHeader}>
                    {props.children}
                </Box>
            </Container>
        </Box>
    )
}


export default SideBar