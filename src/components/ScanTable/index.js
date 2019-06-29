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

import MoreButton from 'components/MoreButton';
import EditAdminModal from 'components/EditAdminModal';

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
      marginTop: theme.spacing(3),
      overflowX: 'auto',
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

  function handleClick() {
    setValues({
      anchorEl: true,
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
  return (
    <main className={classes.layout}>
      <EditAdminModal open={values.anchorEl} handleClose={handleClose} />
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

      <Paper className={classes.root}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='right'>Username</TableCell>
              <TableCell align='left'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scans.map((scan) => {
              const user = users.find(u => u.id === scan.scannedByUserId);
              return (
                <TableRow key={`${scan.name}${user.name}`}>
                  <TableCell align='left'>{scan.name}</TableCell>
                  <TableCell align='right'>{user.name}</TableCell>
                  <TableCell numeric>
                    <MoreButton
                      key={`${scan.name}${user.name}`}
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
