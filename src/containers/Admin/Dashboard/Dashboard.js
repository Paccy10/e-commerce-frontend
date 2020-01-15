import React, { Component } from 'react';
import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import Content from './Content/Content';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <Content />
        </div>
      </div>
    );
  }
}

export default Dashboard;
