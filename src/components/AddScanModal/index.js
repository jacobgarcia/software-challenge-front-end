import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import UsernameSelect from 'components/UsernameSelect';

import 'components/styles.css';

const isDisabled = (selectedScan) => {
  const {
    name, username, min, max,
  } = selectedScan;
  return !(name && username && min && max);
};

const AddScanModal = ({
  open, handleClose, onSave, onChange, selectedScan,
}) => (
  <Modal open={open} onClose={handleClose} className='modal'>
    <div className='paper-container'>
      <div className='paper'>
        <h3>Add Scan</h3>
        <TextField
          required
          label='Name'
          margin='normal'
          name='name'
          variant='outlined'
          onChange={onChange}
          value={selectedScan.name}
          style={{ width: '100%' }}
        />
        <UsernameSelect user={selectedScan.username} onChange={onChange} />
        <div className='elevation-container'>
          <TextField
            required
            name='min'
            label='Min Elevation'
            variant='outlined'
            value={selectedScan.min}
            onChange={onChange}
            style={{ marginRight: '20px' }}
          />
          <TextField
            required
            name='max'
            label='Max Elevation'
            variant='outlined'
            value={selectedScan.max}
            onChange={onChange}
          />
        </div>
        <Button
          disabled={isDisabled(selectedScan)}
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
  selectedScan: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    min: PropTypes.string,
    max: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddScanModal;
