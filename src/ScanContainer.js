import React from 'react';
import { createScanData, createUserData } from 'utils/data';
import ScanList from './ScanList';

class ScanContainer extends React.Component {
  state = {
    scans: createScanData(),
    users: createUserData(),
  };

  render() {
    return (
      <div>
        <ScanList scans={this.state.scans} users={this.state.users} />
      </div>
    );
  }
}

export default ScanContainer;
