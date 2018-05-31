import React from 'react';
import _ from 'lodash';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/alex-tick-list.yml';

import './App.css';

let transformedData = _.sortBy(data, item => -item.climbs.length);
transformedData.forEach(item => {
  item.climbs = _.sortBy(item.climbs, ['style', 'grade', 'name']);
});

export default class App extends React.Component {
  render() {
    return (
      <Sidebar data={transformedData}>
        <Main data={transformedData} />
      </Sidebar>
    );
  }
}
