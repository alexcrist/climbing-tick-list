import React from 'react';
import ReactSidebar from 'react-sidebar';

import './Sidebar.css';

const mediaQuery = window.matchMedia('(min-width: 800px)');

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.getSidebarContent = this.getSidebarContent.bind(this);
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

  buildSection({ location }) {
    return (
      <div key={location} className='Sidebar-section'>{location}</div>
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
