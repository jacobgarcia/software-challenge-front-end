import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import UsernameSelect from 'components/UsernameSelect';

import 'components/styles.css';

const isDisabled = (selectedClient) => {
  const {
    name, username, min, max,
  } = selectedClient;
  return !(name && username && min && max && min < max);
};
const AddScanModal = ({
  open, handleClose, onSave, onChange, selectedClient,
}) => (
  <Modal open={open} onClose={handleClose} className='modal'>
    <div className='paper-container'>
      <div className='paper'>
        <h3>Add Scan</h3>
        <TextField
          required
          label='Name'
          name='name'
          margin='normal'
          variant='outlined'
          value={selectedClient.name}
          onChange={onChange}
          style={{ width: '100%' }}
        />
        <UsernameSelect user={selectedClient.username} handleChange={onChange} />
        <div className='elevation-container'>
          <TextField
            required
            name='min'
            label='Min Elevation'
            variant='outlined'
            value={selectedClient.min}
            onChange={onChange}
            style={{ marginRight: '20px' }}
          />
          <TextField
            required
            name='max'
            label='Max Elevation'
            variant='outlined'
            value={selectedClient.max}
            onChange={onChange}
          />
        </div>
        <Button
          disabled={isDisabled(selectedClient)}
          onClick={onSave}
          variant='contained'
          color='secondary'
        >
          Add
        </Button>
      </div>
    </div>
  </Modal>
);

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
