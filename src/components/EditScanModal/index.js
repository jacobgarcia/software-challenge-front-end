import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import UsernameSelect from 'components/UsernameSelect';

import 'components/styles.css';

const EditScanModal = ({
  open, handleClose, selectedScan, onSave, onChange,
}) => (
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
            value={selectedScan.name}
            onChange={onChange}
            className='user-name'
          />
        </div>
        <UsernameSelect user={selectedScan.username} onChange={onChange} />
        <Button
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

EditScanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedScan: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditScanModal;
