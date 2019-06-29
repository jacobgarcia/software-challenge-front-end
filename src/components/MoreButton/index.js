import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

function MoreButton(props) {
  const [values, setValues] = React.useState({
    sort: '',
    name: 'hai',
    anchorEl: null,
  });
  function handleClose() {
    setValues({ anchorEl: null });
  }

  const { key, handleClick } = props;
  return (
    <div style={{ display: 'inline-block' }}>
      <IconButton
        id={Date.now()}
        aria-owns={values.anchorEl ? 'simple-menu' : null}
        aria-haspopup='true'
        onClick={evt => props.handleClick(evt)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={values.anchorEl}
        open={Boolean(values.anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            props.onEdit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
}

MoreButton.propTypes = {};

MoreButton.defaultProps = {
  onEdit: () => {},
  isActive: false,
  user: '',
  onToggleActive: () => {},
};

export default MoreButton;
