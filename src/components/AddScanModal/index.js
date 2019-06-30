import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import UsernameSelect from 'components/UsernameSelect';
import './index.css';

function AddScanModal({
  open, handleClose, onSave, onChange, selectedClient,
}) {
  return (
    <Modal open={open} onClose={handleClose} className='modal'>
      <div className='paper-container'>
        <div className='paper'>
          <h3>Add Scan</h3>
          <div>
            <TextField
              required
              label='Name'
              name='name'
              margin='normal'
              variant='outlined'
              value={selectedClient.name}
              onChange={onChange}
              className='user-name'
              style={{ width: '100%' }}
            />
          </div>
          <UsernameSelect user={selectedClient.username} handleChange={onChange} />
          <div style={{ marginBottom: '20px' }}>
            <TextField
              required
              name='min'
              label='Min Elevation'
              variant='outlined'
              value={selectedClient.min}
              onChange={onChange}
              className='user-name'
              style={{ marginRight: '20px' }}
            />
            <TextField
              required
              name='max'
              label='Max Elevation'
              variant='outlined'
              value={selectedClient.max}
              onChange={onChange}
              className='user-name'
            />
          </div>

          <Button
            disabled={false}
            onClick={onSave}
            variant='contained'
            color='secondary'
            style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}

AddScanModal.propTypes = {
  selectedClient: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddScanModal;
