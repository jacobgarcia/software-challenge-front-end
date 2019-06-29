import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import { createUserData } from 'utils/data';

export default function SimpleSelect({ user, handleChange }) {
  const [values, setValues] = React.useState({
    username: user,
  });

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
        value={values.username}
        input={<OutlinedInput name='age' labelWidth={labelWidth} id='outlined-age-native-simple' />}
      >
        {createUserData().map(user => (
          <MenuItem value={user.id}>{user.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
