import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../components/style.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';
import { useGlobalState } from '../GlobalState';
import { Checkbox } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function Home() {
    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { todos } = useGlobalState();

    const smallText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const [checked, setChecked] = useState(false);

    const handleToggleCheck = () => {
        setChecked((prevChecked) => !prevChecked);
    };

    return (
        <div>
            <div style={{}} className='homeContainer'>
                <h2 className='h2' style={{
                    padding: isMobile ? '4em' : '2em'
                }}>Good day</h2>
            </div>
            <section style={{
                paddingLeft: isMobile ? '5em' : '2em'
            }}>
                <div className='container'>
                    <div className='containerContent'>
                        <Link to="/todo" className='hoverItem' style={{ color: 'black'}}>
                            <h2>Todo <span style={{
                                color: '#ed6c02',
                                
                            }}> &gt; </span></h2>
                        </Link>
                        {todos.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                                <p>There's nothing here. Add something!</p>
                                <Link to="/todo" className='hoverItem' style={{ color: 'black' }}>
                                    <AddCircleOutlineIcon sx={{ height: '18vh', width: '100%' }}></AddCircleOutlineIcon>
                                </Link>

                                </div>
                        ) : (
                            <ul>
                                {todos.map((todo, index) => (
                                    <li key={index} style={{
                                        padding: '.5em',
                                        marginLeft:'-3vw',
                                        borderBottom: '1px solid #d2d2d2', 
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems:'center',
                                    }}>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleToggleCheck}
                                            color="warning"
                                           
                                        />
                                        {smallText(todo.text, 20)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
