import React from 'react';
import './index.css';

const ScanList = ({ scans, users }) => (
  <>
    <div className='header'>Scans:</div>
    <div className='scan-list'>
      {scans.map((scan) => {
        const user = users.find(u => u.id === scan.scannedByUserId);
        return (
          <div className='scan-list-item' key={`${scan.name}${user.name}`}>
            {scan.name}
            <div className='user-name'>
by
              {user.name}
            </div>
          </div>
        );
      })}
    </div>
  </>
);

export default ScanList;
