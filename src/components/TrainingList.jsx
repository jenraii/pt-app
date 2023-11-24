import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { API_URL } from '../constants';
import AddTraining from './AddTraining';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const [columnDefs] = useState([
        {
            field: 'date', sortable: true, filter: true, width: 200, floatingFilter: true,
            cellRenderer: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        {
            field: 'duration', sortable: true, filter: true, width: 180, headerName: 'Duration (min)', floatingFilter: true,
            cellRenderer: params => params.value + ' min'
        },
        { field: 'activity', sortable: true, filter: true, width: 200, floatingFilter: true },
        {
            field: 'customer', sortable: true, filter: true, width: 200, floatingFilter: true,
            cellRenderer: params => params.value.firstname + ' ' + params.value.lastname
        },
        {
            cellRenderer: params =>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteTraining(params)}>Delete</Button>, width: 150
        },
    ]);

    const getTrainings = () => {
        fetch(API_URL + 'gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong with request: GET');
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
        fetch(API_URL + 'api/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert('Something went wrong with request: GET');
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete choosen training?')) {
            fetch(API_URL + `api/trainings/${params.data.id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Training deletion successful');
                        setOpen(true);
                        getTrainings();
                    }
                    else {
                        alert('Something went wrong with request: DELETE');
                    };
                })
                .catch(err => console.error(err));
        }
    };

    const addTraining = (newTraining) => {
        fetch(API_URL + 'api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Training addition successful');
                    setOpen(true);
                    getTrainings();
                }
                else {
                    alert('Something went wrong with adding ' + response.statusText);
                };
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">Trainings</Typography>
                </Toolbar>
            </AppBar>
            <AddTraining addTraining={addTraining} customers={customers} />
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={2500}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default TrainingList;