import React from 'react';
import _ from 'lodash';
import { Button, TextField, List, ListItem, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const initialGlobalState = {
    count: 0,
    todos: []
};

// Create a Context for the (global) State
const GlobalState = React.createContext();

class Global extends React.Component {
    constructor(props) {
        super(props);

        // Set the initial (global) State
        this.state = {
            globals: initialGlobalState || {},
        };
    }

    // Expose the setGlobals function to the Globals object
    componentDidMount() {
        GlobalState.set = this.setGlobalState;
    }
    setGlobalState = (data = {}) => {
        this.setState((prevState) => {
            const { globals } = prevState;

            // Loop over the data items by key, only updating those which have changed
            Object.keys(data).forEach((key) => {
                globals[key] = data[key];
            });

            // Return the updated state
            return { globals };
        });
    };


    render() {
        const { globals } = this.state;
        const { Root } = this.props;

        return (
            // Pass the current value of GlobalState, based on this components' State, down
            <GlobalState.Provider value={globals}>
                <Root />
            </GlobalState.Provider>
        );
    }
}

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);

// Create an example component which both renders and modifies the GlobalState
function SomeComponent() {
    const { count, todos } = useGlobalState();
    const [newTodo, setNewTodo] = React.useState('');

    const [editIndex, setEditIndex] = React.useState(null);
    const [editValue, setEditValue] = React.useState('');

    function incrementCount() {
        GlobalState.set({
            count: count + 1,
        });
    }

    function AddTodo() {
        if (newTodo.trim() !== '') {
            GlobalState.set({
                count: count + 1,
                todos: [...todos, { text: newTodo, checked: false }],
            });
            setNewTodo('');
        }
    }

    function handleDelete(index) {
        const updatedTodos = _.filter(todos, (_, i) => i !== index);

        GlobalState.set({
            count: count - 1,
            todos: updatedTodos,
        });
    }

    function handleEdit(index, todo) {
        setEditIndex(index);
        setEditValue(todo.text);
    }

    function handleSaveEdit(index) {
        const updatedTodos = _.clone(todos);
        updatedTodos[index].text = editValue;

        GlobalState.set({
            todos: updatedTodos,
        });

        setEditIndex(null);
        setEditValue('');
    }

    function handleToggleCheck(index) {
        const updatedTodos = _.clone(todos);
        updatedTodos[index].checked = !updatedTodos[index].checked;

        GlobalState.set({
            todos: updatedTodos,
        });
    }

    return (
        <div style={{ width: '60vw', paddingLeft: '0', marginLeft: '0', padding:'2em', marginTop: '1vh',  transition:'.3s ease-in-out' }}>
            

            <div style={{ width: '100%', marginBottom: '1em', display: 'flex', alignItems: 'center', border: 'none' }}>
                <TextField
                    type="text"
                    value={newTodo}
                    variant='outlined'
                    onChange={(e) => setNewTodo(e.target.value)}
                    label="Enter new todo"
                    color="warning"
                    style={{width: '50vw'}}
                />
                <Button >
                    <AddCircleOutlineIcon onClick={AddTodo} variant="contained" color="warning" />
                </Button>
            </div>

            <List>
                {todos.map((todo, index) => (
                    <ListItem key={index} style={{
                        marginBottom: '0.5em', display: 'flex', alignItems: 'center', flexDirection: 'row', width: '50vw', borderBottom:'1px solid #d2d2d2'
                    }}>
                        {index === editIndex ? (
                            <div style={{ marginBottom: '0.5em', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <TextField
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    label="Edit Todo"
                                    variant='standard'
                                    color='warning'
                                    style={{ width: '45vw' }}
                                />
                                <Button onClick={() => handleSaveEdit(index)}>
                                    <SaveAsIcon
                                        variant="contained"
                                        color="warning"
                                    />
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                                <div style={{
                                    display: 'flex', flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <Checkbox
                                        checked={todo.checked}
                                        onChange={() => handleToggleCheck(index)}
                                        color="warning"
                                    />
                                    {todo.text}{' '}
                                </div>
                                <div style={{
                                    display: 'flex', flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <IconButton
                                        onClick={() => handleEdit(index, todo)}
                                        color="warning"
                                        style={{ marginLeft: '0.5em' }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(index)}
                                        color="warning"
                                        style={{ marginLeft: '0.5em' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>

                            </div>
                        )}
                    </ListItem>
                ))}
            </List>

        </div>
    );
}

export default function App() {
    // Note: within the Root function we can return any Component (not just SomeComponent, but also a Router for instance)
    return <Global Root={() => <SomeComponent />} />;
}

// Expose the GlobalState object to the window (allowing GlobalState.set({ count: 'new' }) from anywhere in the code (even your console))
window.GlobalState = GlobalState;

export { Global, useGlobalState };
