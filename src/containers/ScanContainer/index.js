import React, { Component } from 'react';
import { createScanData, createUserData } from 'utils/data';
import ScanList from 'components/ScanList';
import ScanTable from 'components/ScanTable';

class ScanContainer extends Component {
  state = {
    scans: createScanData(),
    users: createUserData(),
  };

  render() {
    const { scans, users } = this.state;
    return (
      <>
        <ScanList scans={scans} users={users} />
        <ScanTable />
      </>
    );
  }
}

export default ScanContainer;
