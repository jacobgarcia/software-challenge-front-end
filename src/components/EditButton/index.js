import React from 'react';
import IconCreate from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const EditButton = ({ handleClick, user }) => (
  <IconButton onClick={event => handleClick(event, user)}>
    <IconCreate />
  </IconButton>
);

EditButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default EditButton;
