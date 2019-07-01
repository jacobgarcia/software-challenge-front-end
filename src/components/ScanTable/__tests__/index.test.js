import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { createScanData, createUserData } from 'utils/data';
import ScanTable from 'components/ScanTable';

beforeEach(cleanup);

const loginError = 'Tenemos un problema para iniciar sesión, contacta al área de soporte TI 911@credijusto.com.';

describe('ScanTable', () => {
  const state = {
    scans: createScanData(),
    users: createUserData(),
  };

  test('Should sort scans', () => {
    const { getByText, container } = render(<ScanTable {...state} />);

    const firstElement = getByText(/Concrete Slab #1/);
    expect(container.firstChild.childNodes[1]).toBe(firstElement);
  });
});
