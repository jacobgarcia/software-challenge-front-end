import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';

import './index.css';

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
    if (!prevProps.selectedClient && this.props.selectedClient && !this.state.username) {
      this.setState({
        ...this.props.selectedClient,
        pastUsername: this.props.selectedClient.username,
      });
      return;
    }

    if (prevProps.addUserModalOpen && !this.props.addUserModalOpen && this.state.username) {
      this.setState(getInitialState);
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

  onSave = async () => {};

  render() {
    const {
      props: {
        addUserModalOpen, toggleUserAddModal, open, handleClose,
      },
      state: {
        username, name, valid, _id = true, email, company, error,
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
            {_id && (
              <div>
                <TextField
                  required
                  label='Username'
                  margin='normal'
                  variant='outlined'
                  value={username}
                  onChange={this.onChange('username')}
                />
              </div>
            )}
            {error && <p>{error}</p>}
            <Button
              disabled={valid}
              onClick={this.onSave}
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
