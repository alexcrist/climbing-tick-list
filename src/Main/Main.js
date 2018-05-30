import React from 'react';
import capitalize from 'capitalize';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';

import './Main.css';

export default class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.buildLocation = this.buildLocation.bind(this);
    this.buildClimb = this.buildClimb.bind(this);
    this.buildLegendItem = this.buildLegendItem.bind(this);
    this.state = { currentIndex: -1 };
    this.containerRefs = [];
    props.data.forEach(item => {
      this.containerRefs.push(React.createRef());
    });
  }

  componentDidMount() {
    const main = document.getElementsByClassName('Main')[0];
    this.scrollWindow = main.parentElement.parentElement;
    this.scrollWindow.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.scrollWindow.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const offset = 370;
    const currentIndex = this.containerRefs
      .map(ref => (this.scrollWindow.scrollTop - ref.current.offsetTop) >= offset)
      .filter(value => value)
      .length - 1;
    this.setState({ currentIndex });
  }

  buildLocation({ location, climbs, image }, index) {
    const ref = this.containerRefs[index];

    const climbsAndLocations = climbs.map(climb => ({ ...climb, location }));

    const locationStyle = { backgroundImage: `url(${image})` };
    const locationClasses = classnames('Main-location', {
      'Main-sticky': index === this.state.currentIndex
    });

    const id = escape(location)
      .replace(/\%/g, '');

    return (
      <div
        ref={ref}
        className='Main-container'
        key={index}
        id={id}
      >
        <div className='Main-location-container'>
          <div className={locationClasses} style={locationStyle}>
            <h2 className='Main-location-text'>{location}</h2>
          </div>
        </div>
        <div className='Main-climbs'>
          {climbsAndLocations.map(this.buildClimb)}
        </div>
      </div>
    );
  }

  buildClimb({ style, grade, pitches, name, area, status, location }, index) {
    let formattedPitches = '';
    if (pitches) {
      formattedPitches = pitches === 1 ? ' | 1 pitch' : ` | ${pitches} pitches`;
    }
    const climbInfo = `${capitalize(style)} | ${grade}${formattedPitches}`;
    const search = escape(`${name} ${location}`);
    const link = `https://www.mountainproject.com/search?q=${search}`;

    return (
      <div className='Main-climb' key={index}>
        <FontAwesome className='Main-climb-icon' name={this.getIcon(status)} />
        <a href={link}>
          <div className='Main-climb-header'>{name}</div>
        </a>
        <div className='Main-climb-info'>{climbInfo}</div>
      </div>
    );
  }

  buildLegendItem(text) {
    return (
      <div className='Main-legend-item'>
        <FontAwesome className='Main-legend-icon' name={this.getIcon(text)} />
        <div className='Main-legend-text'>{capitalize(text)}</div>
      </div>
    );
  }

  getIcon(status) {
    switch (status) {
      case 'attempted': return 'circle';
      case 'sent':      return 'paper-plane';
      case 'flashed':   return 'paper-plane-o';
      default:          return 'circle-o';
    }
  }

  render() {
    const legendItems = ['unattempted', 'attempted', 'sent', 'flashed'];
    return (
      <div className='Main'>
        <div className='Main-intro'>
          <h1 className='Main-title'>Climbing Tick List</h1>
          <div className='Main-code'>
            <FontAwesome className='Main-code-icon' name='github' />
            <a href='https://github.com/alexcrist/climbing-tick-list'>
              <div className='Main-code-text'>View on GitHub</div>
            </a>
            <div className='Main-subtitle'>Alex Crist</div>
          </div>
          <div className='Main-legend'>
            <h2 className='Main-legend-title'>Legend</h2>
            {legendItems.map(this.buildLegendItem)}
          </div>
          <FontAwesome className='Main-down' name='long-arrow-down' />
        </div>
        {this.props.data.map(this.buildLocation)}
      </div>
    );
  }
}