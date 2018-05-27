import React from 'react';
import ReactDOM from 'react-dom';
import capitalize from 'capitalize';
import data from './data.yml';
import './index.css';

const buildLocation = ({ location, climbs }) => (
  <section key={location}>
    <h2>{location}</h2>
    <div className='climbs-container'>{climbs.map(buildClimb)}</div>
  </section>
);

const buildClimb = ({ style, grade, pitches, name, area, status }) => {
  let formattedPitches = '';
  if (pitches) {
    formattedPitches = pitches === 1 ? '1 pitch' : `${pitches} pitches`;
  }
  const climbAttributes = `${style} | ${grade}${formattedPitches}`;
  climbAttributes += pitches ? 

  <div key={name} className='climb-container'>
    <h3>{name}</h3>
    <div className='climb-attributes'>
      <div className='climb-style'>{capitalize(style)}</div>
      <div className='climb-grade'>{grade}</div>
      <div className='climb-area'>{area}</div>
      <div className='climb-pitches'>{pitches && pitches > 1 && pitches + ' pitches'}</div>
    </div>
    {status && <div className='climb-status'>{capitalize(status)}</div>}
  </div>
};

const App = () => data.map(buildLocation);
ReactDOM.render(<App />, document.getElementById('root'));
