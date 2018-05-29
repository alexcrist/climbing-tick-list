import React from 'react';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/alex-tick-list.yml';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Sidebar data={data}>
        <Main data={data} />
      </Sidebar>
    );
  }
}
