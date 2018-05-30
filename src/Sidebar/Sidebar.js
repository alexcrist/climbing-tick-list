import React from 'react';
import ReactSidebar from 'react-sidebar';
import $ from 'jquery';

import './Sidebar.css';

const mediaQuery = window.matchMedia('(min-width: 800px)');

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.getSidebarContent = this.getSidebarContent.bind(this);
    this.buildSection = this.buildSection.bind(this);
    this.state = {
      mediaQuery: mediaQuery,
      docked: props.docked,
      open: props.open
    }
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  componentWillMount() {
    mediaQuery.addListener(this.mediaQueryChanged);
    this.setState({ mediaQuery: mediaQuery, sidebarDocked: mediaQuery.matches });
  }

  componentWillUnmount() {
    this.state.mediaQuery.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mediaQuery.matches });
  }

  getScrollTo(location) {
    return () => {
      const scrollWindow = $('.Main').parent().parent();
      const id = escape(location)
        .replace(/\%/g, '');
      console.log('id', id);
      const position = scrollWindow.scrollTop();
      const delta = $(`#${id}`).position().top + 370;
      scrollWindow.animate({
        scrollTop: position + delta
      }, 1000);
    };
  }

  buildSection({ location }) {
    return (
      <div
        key={location}
        className='Sidebar-section'
        onClick={this.getScrollTo(location)}
      >
        {location}
      </div>
    );
  }

  getSidebarContent() {
    return (
      <div className='Sidebar-container'>
        <h2 className='Sidebar-header'>Locations</h2>
        {this.props.data.map(this.buildSection)}
      </div>
    );
  }

  render() {
    return (
      <ReactSidebar
        sidebar={this.getSidebarContent()}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <div>{this.props.children}</div>
      </ReactSidebar>
    );
  }
}
