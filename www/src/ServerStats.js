import React from 'react';
import moment from 'moment';
import './App.css';

const delay = 5 * 60 * 1000 // every 5 min

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.renderCompactView = this.renderCompactView.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.renderWideView = this.renderWideView.bind(this);
    this.state = {
      loading: true,
      stats: {}
    }
  }

  componentDidMount() {
    this.refresh();
    setTimeout(() => this.refresh(), delay);
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
        <div>
          <div className="d-inline-block alert alert-danger text-left shadow-sm">
            <span className="circle py-1 px-2 mr-2 bg-danger text-white">✖︎</span>
            <strong className="text-danger">Offline</strong>
          </div>
        </div>
      );
    }
  }

  renderCompactView() {
    const {stats} = this.state;
    return (
      <div className="d-sm-none">
        <div className="row d-sm-none">
          <div className="col">
            <div className="text-center">
              <div className="h1 my-1 text-shadow">minecraft.glompix.com</div>
              <div className="d-flex justify-content-center">
                <div className="mr-1">{stats.server.name}</div>
                <div className="ml-1">motd: {stats.motd}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 d-sm-none">
          <div className="col">
            <div className="d-flex justify-content-center">
              <img
                src="apple-touch-icon.png"
                className="shadow-sm rounded mr-3"
                style={{
                  height: '96px'
                }}
                alt="server icon"/> {this.renderStatus()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="small">
              <i>Updated: {moment.unix(stats.last_updated).format('lll')}</i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderWideView() {
    const {stats} = this.state;
    return (
      <div className="d-none d-sm-block">
        <div className="row clearfix">
          <div className="col">
            <div className="d-flex float-right">
              <img
                src="apple-touch-icon.png"
                className="shadow-sm rounded mr-4"
                style={{
                  height: '96px'
                }}
                alt="server icon"/>
              <div className="align-self-center">
                <div className="h1 my-1 text-shadow">minecraft.glompix.com</div>
                <div className="d-flex justify-content-between">
                  <div>{stats.server.name}</div>
                  <div>motd: {stats.motd}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <div className="text-right">
              {this.renderStatus()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-right">
            <div className="small">
              <i>Updated: {moment.unix(stats.last_updated).format('lll')}</i>
            </div>
          </div>
        </div>
      </div>
    );
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
      <div className="container-fluid">
        {this.renderWideView()}
        {this.renderCompactView()}
      </div>
    );
  }
}
