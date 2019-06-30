import React, { Component } from 'react';
import { createScanData, createUserData } from 'utils/data';
import ScanTable from 'components/ScanTable';

class ScanContainer extends Component {
  state = {
    scans: createScanData(),
    users: createUserData(),
  };

  render() {
    return <ScanTable {...this.state} />;
  }
}

export default ScanContainer;
