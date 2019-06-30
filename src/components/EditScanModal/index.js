import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import SelectUsername from 'components/SelectUsername';
import './index.css';

function getInitialState() {
  return {
    id: null,
  };
}

class ClientModal extends Component {
  static propTypes = {};

  state = {
    ...getInitialState,
  };

  render() {
    const {
      props: {
        open, handleClose, selectedClient, onSave, onChange,
      },
    } = this;

    return (
      <Modal open={open} onClose={handleClose} className='modal'>
        <div className='paper-container'>
          <div className='paper'>
            <h3>Edit Scan</h3>
            <div>
              <TextField
                required
                name='name'
                label='Name'
                margin='normal'
                variant='outlined'
                value={selectedClient.name}
                onChange={onChange}
                className='user-name'
              />
            </div>
            <SelectUsername user={selectedClient.username} handleChange={onChange} />
            <Button
              disabled={false}
              onClick={onSave}
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
