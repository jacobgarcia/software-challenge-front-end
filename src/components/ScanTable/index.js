import React from 'react';
import PropTypes from 'prop-types';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import AddScanModal from 'components/AddScanModal';
import EditButton from 'components/EditButton';
import EditScanModal from 'components/EditScanModal';

import './styles.less';

const useStyles = makeStyles(theme => ({
  layout: {
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

function ScanTable({ scans, users }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sort: '',
    name: null,
    username: null,
    id: null,
    isEditOpen: false,
    isAddOpen: false,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(5);

  function sortByName(a, b) {
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  }

  function sortByUsername(a, b) {
    const x = users.find(user => user.id === a.scannedByUserId);
    const y = users.find(user => user.id === b.scannedByUserId);
    return sortByName(x, y);
  }

  function sortByElevation(a, b) {
    return a.elevationMin - b.elevationMin || a.elevationMax - b.elevationMax;
  }

  function unsort(a, b) {
    return a.id - b.id;
  }

  function sortScans(sort) {
    let sortFunction = () => {};
    switch (sort) {
      case 'name':
        sortFunction = sortByName;
        break;
      case 'username':
        sortFunction = sortByUsername;
        break;
      case 'elevation':
        sortFunction = sortByElevation;
        break;
      default:
        sortFunction = unsort;
    }

    scans.sort(sortFunction);
  }

  function handleCloseModal() {
    setValues(oldValues => ({
      ...oldValues,
      isEditOpen: false,
      isAddOpen: false,
    }));
  }

  function handleAddClick() {
    setValues(oldValues => ({
      ...oldValues,
      isAddOpen: true,
      name: '',
      username: '',
      min: '',
      max: '',
    }));
  }

  function handleEditClick(event, user) {
    const [name, username, id] = user.split('-');

    setValues(oldValues => ({
      ...oldValues,
      isEditOpen: true,
      name,
      username,
      id,
    }));
  }

  function handleSortChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    sortScans(event.target.value);
  }

  function handleEdit() {
    const editedScan = scans.find(scan => scan.id === parseInt(values.id, 10));
    editedScan.name = values.name;
    editedScan.scannedByUserId = parseInt(values.username, 10);
    sortScans(values.sort);
    handleCloseModal();
  }

  function handleAdd() {
    const newScan = {
      name: values.name,
      scannedByUserId: values.username,
      elevationMin: values.min,
      elevationMax: values.max,
    };
    scans.push(newScan);
    sortScans(values.sort);
    handleCloseModal();
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function onChangeInput(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, scans.length - page * rowsPerPage);

  return (
    <main className={classes.layout}>
      <EditScanModal
        open={values.isEditOpen}
        handleClose={handleCloseModal}
        selectedScan={values}
        onSave={handleEdit}
        onChange={onChangeInput}
      />
      <AddScanModal
        open={values.isAddOpen}
        handleClose={handleCloseModal}
        selectedScan={values}
        onSave={handleAdd}
        onChange={onChangeInput}
      />
      <FormControl style={{ marginBottom: '30px', width: '50%' }}>
        <InputLabel>Sort Scans</InputLabel>
        <Select
          value={values.sort}
          onChange={handleSortChange}
          inputProps={{
            name: 'sort',
          }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='username'>Username</MenuItem>
          <MenuItem value='elevation'>Elevation</MenuItem>
        </Select>
      </FormControl>
      <Paper style={{ overflow: 'auto' }}>
        <Table size='small' style={{ minHeight: 400, overflow: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='right'>Username</TableCell>
              <TableCell align='left'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((scan) => {
              const user = users.find(u => u.id === scan.scannedByUserId);
              return (
                <TableRow key={`${scan.id}`}>
                  <TableCell align='left'>{scan.name}</TableCell>
                  <TableCell align='right'>{user.name}</TableCell>
                  <TableCell>
                    <EditButton
                      user={`${scan.name}-${user.id}-${scan.id}`}
                      isEditOpen={values.isEditOpen}
                      handleClick={handleEditClick}
                      handleClose={handleCloseModal}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 75 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component='div'
          count={scans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
        />
      </Paper>
      <Fab
        size='medium'
        color='secondary'
        onClick={handleAddClick}
        style={{ marginTop: '15px', float: 'right' }}
      >
        <AddIcon />
      </Fab>
    </main>
  );
}

ScanTable.propTypes = {
  scans: PropTypes.arrayOf(
    PropTypes.shape({
      scannedByUserId: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ScanTable;
