import React from 'react';
import { Container } from '@mui/material';
import Global from '../GlobalState'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import {  createTheme } from '@mui/material/styles';


function Todo() {
  const theme = createTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div style={{
      padding: isMobile ? '5em' : '2em'
    }}>
      
      <Container style={{ padding: '0' }}>
        <div style={{ paddingBottom: '1em', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.2em' }}>
          <h1>Todo List</h1>
          {/* <div onClick={incrementCount}>
                    Count: {count}
                </div> */}
        </div>
        <Global Root={null} />
      </Container>
    </div>
  );
}

export default Todo;
