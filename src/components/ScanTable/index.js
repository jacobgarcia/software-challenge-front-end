import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TablePagination from '@material-ui/core/TablePagination';

import MoreButton from 'components/MoreButton';
import EditAdminModal from 'components/EditAdminModal';
import AddScanModal from 'components/AddScanModal';
import './index.less';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    root: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 700,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: 'red',
    },
    whiteColor: {
      color: 'red',
    },
  },
}));

function ScanTable({ scans, users }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sort: '',
    name: 'hai',
    anchorEl: false,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    const x = users.find(u => u.id === a.scannedByUserId);
    const y = users.find(u => u.id === b.scannedByUserId);
    return sortByName(x, y);
  }

  function sortByElevation(a, b) {
    return a.elevationMin - b.elevationMin || a.elevationMax - b.elevationMax;
  }

  function unsort(a, b) {
    return a.id - b.id;
  }

  function handleClose() {
    setValues({ anchorEl: false });
  }

  function handleToggle() {
    setValues({ add: true, name: '', username: '' });
  }

  function handleClick(event, user) {
    const [name, username, id] = user.split('-');
    setValues({
      anchorEl: true,
      name,
      username,
      id,
    });
  }

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    let sortFunction = () => {};
    switch (event.target.value) {
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

  function handleEdit(id, name, userId) {
    const editedScan = scans.find(scan => scan.id === parseInt(id, 10));
    editedScan.name = name;
    editedScan.scannedByUserId = parseInt(userId, 10);
    handleClose();
  }

  function handleAdd(name, userId, min, max) {
    const newScan = {
      name,
      scannedByUserId: userId,
      elevationMin: min,
      elevationMax: max,
    };
    scans.push(newScan);

    handleClose();
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  return (
    <main className={classes.layout}>
      <EditAdminModal
        key={values}
        open={values.anchorEl}
        handleClose={handleClose}
        selectedClient={values}
        onSave={handleEdit}
      />
      <AddScanModal
        key={values}
        open={values.add}
        handleClose={handleClose}
        selectedClient={values}
        onSave={handleAdd}
      />
      <FormControl className={classes.formControl} style={{ marginBottom: '30px', width: '50%' }}>
        <InputLabel htmlFor='age-simple'>Sort Scans</InputLabel>
        <Select
          value={values.sort}
          onChange={handleChange}
          inputProps={{
            name: 'sort',
          }}
          className={{ root: classes.whiteColor }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='username'>Username</MenuItem>
          <MenuItem value='elevation'>Elevation</MenuItem>
        </Select>
      </FormControl>

      <Fab
        size='medium'
        color='secondary'
        aria-label='Add'
        className={classes.margin}
        style={{ marginTop: '15px', float: 'right', marginRight: '60px' }}
        onClick={handleToggle}
      >
        <AddIcon />
      </Fab>

      <Paper className={classes.root} style={{ overflow: 'auto' }}>
        <Table className={classes.table} size='small' style={{ minHeight: 400, overflow: 'auto' }}>
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
                  <TableCell numeric>
                    <MoreButton
                      user={`${scan.name}-${user.id}-${scan.id}`}
                      anchorEl={values.anchorEl}
                      handleClick={handleClick}
                      handleClose={handleClose}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
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
