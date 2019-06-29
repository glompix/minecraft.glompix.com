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
        <div>
          <div className="d-inline-block alert alert-success text-left shadow-sm text-center">
            <strong className="text-success mr-2">
              <span className="circle py-1 px-2 mr-2 bg-success text-white">✓</span>
              Online
            </strong>

            <div className="mt-2">
              {stats.players.now}/{stats.players.max}&nbsp;players online
            </div>

            <div className="mt-2">
              Uptime: {moment.duration(stats.duration).humanize()}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="d-inline-block alert alert-danger text-left shadow-sm">
          <span className="circle py-1 px-2 mr-2 bg-danger text-white">✖︎</span>
          <strong className="text-danger">Offline</strong>
        </div>
      );
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
      <div className="text-right">
        <div className="d-flex justify-content-end">
          <img
            src="apple-touch-icon.png"
            className="shadow-sm rounded"
            style={{
              height: '96px'
            }}
            alt="server icon"/>
          <div className="pl-3">
            <div className="h1 my-1 text-shadow">minecraft.glompix.com</div>
            <div className="d-flex justify-content-between">
              <div>{stats.server.name}</div>
              <div>motd: {stats.motd}</div>
            </div>
          </div>
        </div>
        <div className="mt-4">{this.renderStatus()}</div>
        <div className="small">
          <i>Updated: {moment.unix(stats.last_updated).format('lll')}</i>
        </div>
      </div>
    );
  }
}
