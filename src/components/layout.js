import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import { Drawer, List, ListItemButton, ListItemText, Hidden, IconButton, Toolbar, Paper } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';


const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100vh' }}>
                {isMobile ? (
                    //mobile layout
                    <>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor="left"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true,
                                }}
                            >
                                <Paper sx={{
                                    width: '30vw', boxShadow: 'none', height: '100%', backgroundColor: 'rgb(255 161 84)', color: 'white', borderRadius: '0',
                                }}>
                                    <List>
                                        <div style={{
                                            height: '8vh'
                                        }}></div>
                                        <ListItemButton component={Link} to="/" onClick={handleDrawerToggle} sx={{
                                            gap: '.5em',
                                            transition: '.3s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgb(209, 86, 24)',
                                                transition:'.3s ease-in-out'
                                            },
                                        }}>
                                            <HomeIcon />
                                            <ListItemText primary="Start"/>
                                        </ListItemButton>
                                      
                                        <ListItemButton component={Link} to="/todo" onClick={handleDrawerToggle} sx={{
                                             gap: '.5em',
                                            transition: '.3s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgb(209, 86, 24)',
                                                transition: '.3s ease-in-out'
                                            },
                                        }}>
                                            <AssignmentIcon />
                                            <ListItemText primary="Todo List" />
                                        </ListItemButton>
                                    </List>
                                </Paper>
                            </Drawer>
                        </Hidden>
                        <Hidden mdUp>
                            <Toolbar sx={{ paddingLeft: 0, paddingRight: 0, display:'flex', flexDirection:'column', position:'absolute', marginTop:'1vh', marginLeft:'1vw', color:'#fff', zIndex:'10'  }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                    edge="start"
                                    sx={{ mr: 2, display: { xs: 'block', md: 'none' },  backgroundColor:'#ed6c02', display:"flex", margin:'auto', width:'2em', height:'2em'}}
                                >
                                    <MenuIcon sx={{ color: '#fff', fontSize:'2rem' }} />
                                </IconButton>
                            </Toolbar>
                        </Hidden>
                    </>
                ) : (
                    //desktop layout
                    <div style={{
                                color: '#fff',
                                transition: 'width 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent:'center'
                        }}>
                            <div style={{
                                    width: '20vw',
                                backgroundColor: 'rgb(255 161 84)', height: '100%', display: 'flex',
                                    transition: 'width 0.3s ease',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                            }}>
                                <div style={{
                                    height: '8em'
                                }}></div>
                                <Link to="/" className='listItem'>
                                    <div className='listItemContainer'>
                                        <div style={{
                                                    display: 'flex', flexDirection: 'row', gap:'.5em' 
                                        }}>
                                            <HomeIcon style={{ fontSize: '1.5rem' }} />
                                            <div>Start</div>
                                            
                                        </div>
                                </div>
                                </Link>
                                <Link to="/todo" className='listItem'>
                                    <div className='listItemContainer'>
                                        <div style={{
                                           display: 'flex', flexDirection: 'row', gap:'.5em'
                                        }}>
                                            <AssignmentIcon style={{ fontSize: '1.5rem' }} />
                                            <div>Todo</div>
                                            
                                        </div>                                      
                                    </div>
                                </Link>
                            </div>
                    </div>
                )}
                <div style={{ flex: 1, overflowY: 'auto'
                }}>
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Layout;

