import React from 'react';
import { createScanData, createUserData } from 'utils/data';
import ScanTable from 'components/ScanTable';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

configure({ adapter: new Adapter() });

describe('ScanTable', () => {
  let state;
  beforeEach(() => {
    jest.resetModules();
    state = {
      scans: createScanData(),
      users: createUserData(),
    };
  });

  test('Should sort scans by name', () => {
    const wrapper = mount(<ScanTable {...state} />);

    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('Concrete Slab #1Linus Torvalds');

    const select = wrapper.find(Select);
    expect(select).toHaveLength(1);

    select.find('[role="button"]').simulate('click');
    wrapper
      .find(MenuItem)
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('CeilingLinus Torvalds');
  });

  test('Should sort scans by username', () => {
    const wrapper = mount(<ScanTable {...state} />);

    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('Concrete Slab #1Linus Torvalds');

    const select = wrapper.find(Select);
    expect(select).toHaveLength(1);

    select.find('[role="button"]').simulate('click');
    wrapper
      .find(MenuItem)
      .at(2)
      .simulate('click');
    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('FloorGuido van Rossum');
  });

  test('Should sort scans by elevation', () => {
    const wrapper = mount(<ScanTable {...state} />);

    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('Concrete Slab #1Linus Torvalds');

    const select = wrapper.find(Select);
    expect(select).toHaveLength(1);

    select.find('[role="button"]').simulate('click');
    wrapper
      .find(MenuItem)
      .at(3)
      .simulate('click');
    expect(
      wrapper
        .find('.MuiTableRow-root')
        .at(1)
        .text(),
    ).toEqual('FloorGuido van Rossum');
  });

  test('Should open/close edit modal', () => {
    const wrapper = mount(<ScanTable {...state} />);
    expect(wrapper.find('h3')).toHaveLength(0);

    const firstRecord = wrapper.find('.MuiTableRow-root').at(1);
    firstRecord.find('button').simulate('click');
    expect(wrapper.find('h3').text()).toBe('Edit Scan');

    wrapper.find(Button).simulate('click');

    expect(wrapper.find('h3')).toHaveLength(0);
  });

  test('Should open/close add modal', () => {
    const wrapper = mount(<ScanTable {...state} />);
    expect(wrapper.find('h3')).toHaveLength(0);

    wrapper.find(Fab).simulate('click');

    expect(wrapper.find('h3').text()).toBe('Add Scan');

    wrapper
      .find('.modal')
      .at(1)
      .simulate('keydown', { key: 'Escape' });

    expect(wrapper.find('h3')).toHaveLength(0);
  });
});
