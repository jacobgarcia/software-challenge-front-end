import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import { createUserData } from 'utils/data';

function UsernameSelect({ user, onChange }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      variant='outlined'
      style={{ marginBottom: '30px', width: '100%', marginTop: '10px' }}
    >
      <InputLabel ref={inputLabel}>Username *</InputLabel>
      <Select
        variant='filled'
        onChange={onChange}
        inputProps={{
          name: 'username',
        }}
        value={user}
        input={<OutlinedInput name='age' labelWidth={labelWidth} />}
      >
        {createUserData().map(userRecord => (
          <MenuItem key={userRecord.id} value={userRecord.id}>
            {userRecord.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

UsernameSelect.propTypes = {
  user: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

UsernameSelect.defaultProps = {
  user: null,
};

export default UsernameSelect;
