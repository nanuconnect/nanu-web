import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { userData, userDataByCode } from '../redux/actions/userAction'
import MobModal from './MobModal'
import { Modal, Button } from 'react-bootstrap';
import './UserDetails.css'


class UserDetails extends Component {
  state = {
    coinName: '',
    address: '',
    show: false,
    copied: false,
  }

  componentDidMount() {
    console.log(this.props.match.params.username);
    if (this.props.match.params.username && this.props.match.params.username.indexOf('b=') > -1) {
      console.log(this.props.match.params.username.replace('b=', ''));
      this.props.userDataByCode(this.props.match.params.username.replace('b=', ''));
    } else {
      this.props.userData(this.props.match.params.username)
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (newProps.match.params.username.indexOf('b=') < 0 && !newProps.user) {
      this.props.userData(newProps.match.params.username)
    }
  }

  openApp = () => {
    window.open("https://nanuconnect.com/download", "_blank");
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false, copied: false });
  }

  openAddress = (ad) => {
    console.log(ad);
    this.setState({ coinName: Object.keys(ad)[0], address: ad[Object.keys(ad)[0]] });
    this.handleShow();
  }

  copyAddress = async () => {
    if (this.state.coinName === 'VENMO') {
      if (this.state.address[0] === '@') {
        window.open(`https://venmo.com/u/${this.state.address.slice(1)}`, "_blank");
      } else {
        window.open(`https://venmo.com/u/${this.state.address}`, "_blank");
      }
    } else if (this.state.coinName === 'CASH') {
      if (this.state.address[0] === '$') {
        window.open(`https://cash.app/${this.state.address}`, "_blank");
      } else {
        window.open(`https://cash.app/$${this.state.address}`, "_blank");
      }
    } else if (this.state.coinName === 'PAYPAL') {
      window.open(`https://paypal.me/${this.state.address}`, "_blank");
    } else {
      await navigator.clipboard.writeText(this.state.address);
      this.setState({ copied: true });
    }

  }

  render() {
    if (this.props.username === undefined) {
      window.alert('Bracelet has not been linked');
    }
    return (this.props.user && this.props.user.username === this.props.match.params.username) ? (
      <div
        className='container-fluid px-0'
      >
        <div className="desktop-modal">
          <button className="download-btn" onClick={this.openApp}>
            Download the App
          </button>
        </div>
        <div className="mobile-modal">
          <MobModal />
        </div>
        <div>
          <div className='card hovercard'>
            <div className='avatar'>
              <img alt='' src={this.props.user.profileImageURL} />
            </div>
            <div className='info'>
              <h4 className='title'>{this.props.user.fullname}</h4>
              <p className='username'>nanu.life/{this.props.user.username}</p>
              <p className='desc'>{this.props.user.bio}</p>
            </div>
            <hr style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }} />
            <div className="pt-3 px-3 row pb-6">
              {this.props.user.addressDictionary ?
                this.props.user.addressDictionary.map((address, index) => (
                  <div className="col-4 mb-4" key={index}>
                    <div className="address" onClick={() => this.openAddress(address)}>
                      <img alt='' src={process.env.PUBLIC_URL + `/NanuIcons/${Object.keys(address)[0]}.png`} />
                      <div className="p-2 key">{Object.keys(address)[0]}</div>
                    </div>
                  </div>
                ))
                : null}
            </div>
          </div>
        </div>
        <Modal show={this.state.show} animation={false} centered onHide={this.handleClose} className="modal">
          <Modal.Header className="row">
            <div className="col-auto">
              <img alt='' src={process.env.PUBLIC_URL + `/NanuIcons/${this.state.coinName}.png`} />
            </div>
            <div className="col modal-coinname">
              {this.state.coinName}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-address">Address</div>
            <div className="modal-key">{this.state.address}</div>
            <div className="p-3">
              {
                ["VENMO", "CASH", "PAYPAL"].indexOf(this.state.coinName) > -1 ?
                  <Button className="modal-button" onClick={() => this.copyAddress()} >
                    OPEN
                  </Button>
                  :
                  <Button className="modal-button" onClick={() => this.copyAddress()} disabled={this.state.copied}>
                    {this.state.copied ? 'Copied' : 'Copy Address'}
                  </Button>
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    ) : this.props.username ?
      <Redirect to={`/${this.props.username}`} /> : (
        <h3 className="color-white">Loading...</h3>
      )
  }
}

const mapStateToProps = storeState => {
  return { user: storeState.listState.single, username: storeState.listState.username }
}

export default withRouter(connect(mapStateToProps, { userData, userDataByCode })(UserDetails))