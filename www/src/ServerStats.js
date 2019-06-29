import React from 'react';
import moment from 'moment';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.state = {
      loading: true,
      stats: {}
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.setState({loading: true})
    fetch('https://mcapi.us/server/status?ip=minecraft.glompix.com').then(response => response.json()).then(
      stats => this.setState({loading: false, stats})
    )
  }

  renderStatus() {
    const {stats} = this.state;
    if (stats.online) {
      return (
        <React.Fragment>
          <div>
            <span role="img" aria-label="online">✅ Online</span>
            <span className="mx-1">-</span>
            <span>{stats.server.name}</span>
          </div>
          <div>{stats.players.now}/{stats.players.max}&nbsp;players online</div>
          <div>Uptime: {moment.duration(stats.duration).humanize()}</div>
          <div>Last Online: {moment.unix(stats.last_online).format('lll')}</div>
        </React.Fragment>
      );
    } else {
      return (<React.Fragment>
        <span role="img" aria-label="offline">❌ Offline</span>
      </React.Fragment>);
    }
  }

  render() {
    const {loading, stats} = this.state;
    const {error} = stats;

    if (loading) {
      return (<div>Loading...</div>);
    }

    if (loading) {
      return (<div>{JSON.stringify(error)}</div>);
    }

    return (
      <div className="stats-block">
        <div>{stats.motd}</div>
        <div className="mt-4">{this.renderStatus()}</div>
        <div className="mt-4 text-small">
          <i>Updated: {moment.unix(stats.last_updated).format('lll')}</i>
        </div>
      </div>
    );
  }
}
