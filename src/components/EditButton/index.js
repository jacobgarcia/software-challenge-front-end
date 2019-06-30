import React from 'react';
import IconCreate from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const EditButton = ({ handleClick, user }) => (
  <div style={{ display: 'inline-block' }}>
    <IconButton id={Date.now()} onClick={event => handleClick(event, user)}>
      <IconCreate />
    </IconButton>
  </div>
);

EditButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default EditButton;
