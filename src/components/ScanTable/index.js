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

import './index.less';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

function ScanTable({ scans, users }) {
  const classes = useStyles();

  return (
    <main className={classes.layout}>
      <Paper className='paper'>
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='right'>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scans.map((scan) => {
              const user = users.find(u => u.id === scan.scannedByUserId);
              return (
                <TableRow key={`${scan.name}${user.name}`}>
                  <TableCell align='left'>{scan.name}</TableCell>
                  <TableCell align='right'>{user.name}</TableCell>
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
