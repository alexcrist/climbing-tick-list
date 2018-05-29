import React from 'react';
import capitalize from 'capitalize';
import classnames from 'classnames';

import './Main.css';

export default class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.buildLocation = this.buildLocation.bind(this);
    this.buildClimb = this.buildClimb.bind(this);
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
    console.log(event);
    const offset = 270;
    const currentIndex = this.containerRefs
      .map(ref => {
        console.log((this.scrollWindow.scrollTop - ref.current.offsetTop));
        return (this.scrollWindow.scrollTop - ref.current.offsetTop) >= offset;
      })
      .filter(value => value)
      .length - 1;
    console.log('CURRENT INDEX', currentIndex);
    this.setState({ currentIndex });
  }

  buildLocation({ location, climbs, image }, index) {
    const locationStyle = {
      // background: `url(${image})`
    };

    const ref = this.containerRefs[index];

    const locationClasses = classnames('Main-location', {
      'Main-sticky': index === this.state.currentIndex
    });

    return (
      <div ref={ref} className='Main-container' key={index}>
        <div className='Main-location-container'>
          <div className={locationClasses} style={locationStyle}>
            <h2 className='Main-location-text'>{location}</h2>
          </div>
        </div>
        <div className='Main-climbs'>{climbs.map(this.buildClimb)}</div>
      </div>
    );
  }

  buildClimb({ style, grade, pitches, name, area, status }, index) {
    let formattedPitches = '';
    if (pitches) {
      formattedPitches = pitches === 1 ? ' | 1 pitch' : ` | ${pitches} pitches`;
    }
    const climbInfo = `${capitalize(style)} | ${grade}${formattedPitches}`;

    return (
      <div className='Main-climb' key={index}>
        <div className='Main-climb-header'>{name}</div>
        <div className='Main-climb-info'>{climbInfo}</div>
      </div>
    );
  }

  render() {
    return (
      <div className='Main'>
        <div className='Main-intro'>
          <h1 className='Main-intro-title'>Climbing Tick List</h1>
          <div className='Main-intro-subtitle'>Alex Crist</div>
        </div>
        {this.props.data.map(this.buildLocation)}
      </div>
    );
  }
}