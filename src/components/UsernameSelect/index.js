import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import { createUserData } from 'utils/data';

function UsernameSelect({ user, handleChange }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <FormControl
      style={{ marginBottom: '30px', width: '100%', marginTop: '10px' }}
      variant='outlined'
    >
      <InputLabel ref={inputLabel} htmlFor='outlined-age-native-simple'>
        Username *
      </InputLabel>
      <Select
        onChange={handleChange}
        inputProps={{
          name: 'username',
        }}
        variant='filled'
        value={user}
        input={<OutlinedInput name='age' labelWidth={labelWidth} id='outlined-age-native-simple' />}
      >
        {createUserData().map(userRecord => (
          <MenuItem value={userRecord.id}>{userRecord.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

UsernameSelect.propTypes = {
  user: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UsernameSelect;
