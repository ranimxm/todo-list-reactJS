
import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Hidden, IconButton, Toolbar, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';


function Sidebar() {


    
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <Hidden smDown> 
                <Drawer variant="permanent" anchor="left">
                    <Paper sx={{ width: '11em', boxShadow: 'none', paddingTop: '1em', height: '100%', backgroundColor: '#ed6c02', color: 'white', borderRadius:'0' }}>
                        <List >
                            <ListItemButton component={Link} to="/" sx={{ paddingLeft: '1.2em'}}  >
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/about" sx={{ paddingLeft: '1.2em' }}>
                                <ListItemText primary="About" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/todo" sx={{ paddingLeft: '1.2em' }}>
                                <ListItemText primary="Todo List" />
                            </ListItemButton>
                        </List>
                    </Paper>
                </Drawer>
            </Hidden>

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
                    <Paper sx={{ width: '10em', boxShadow: 'none', padding: '1em', height: '100%', backgroundColor: '#ed6c02', color: 'white', borderRadius: '0', fontSize: 'larger' }}>
                        <List>
                            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/about" onClick={handleDrawerToggle}>
                                <ListItemText primary="About" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/todo" >
                                <ListItemText primary="Todo List" />
                            </ListItemButton>
                        </List>
                    </Paper>
                </Drawer>
            </Hidden>

            <Hidden mdUp>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' }, padding: '1em'  }}
                    >
                        <MenuIcon sx={{ color: 'black' }} />
                    </IconButton>
                </Toolbar>
            </Hidden>
        </div>
    );
};

export default Sidebar;

