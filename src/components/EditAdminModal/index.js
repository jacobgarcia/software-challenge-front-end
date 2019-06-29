import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import SelectUsername from 'components/SelectUsername';
import './index.css';

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
function getInitialState() {
  return {
    _id: null,
    name: '',
    username: '',
    email: '',
    company: '',
    valid: false,
    pastUsername: '',
  };
}

class ClientModal extends Component {
  static propTypes = {};

  state = {
    ...getInitialState,
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedClient !== prevProps.selectedClient) {
      this.setState({
        ...this.props.selectedClient,
      });
    }
  }

  handlecheckChange = name => () => this.setState({ [name]: false });

  onChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value, error: null }, () => {
      this.setState({
        valid: (this.state.name && this.state.email) || (!this.state._id && this.state.email),
      });
    });
  };

  handleChange = (event) => {
    this.setState(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  render() {
    const {
      props: {
        addUserModalOpen, toggleUserAddModal, open, handleClose, selectedClient, onSave,
      },
      state: {
        username, name, valid, _id = true, email, company, error, id,
      },
    } = this;

    return (
      <Modal open={open} onClose={handleClose} className='modal'>
        <div className='paper-container'>
          <div className='paper'>
            <h3>Edit Scan</h3>
            {_id && (
              <div>
                <TextField
                  required
                  label='Name'
                  margin='normal'
                  variant='outlined'
                  value={name}
                  onChange={this.onChange('name')}
                  className='user-name'
                />
              </div>
            )}
            <SelectUsername user={username} handleChange={this.handleChange} />
            {error && <p>{error}</p>}
            <Button
              disabled={valid}
              onClick={() => onSave(id, name, username)}
              variant='contained'
              color='secondary'
              style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
            >
              Edit
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ClientModal;
