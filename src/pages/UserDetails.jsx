import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { userData } from '../redux/actions/userAction'
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
    this.props.userData(this.props.match.params.username)
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
    await navigator.clipboard.writeText(this.state.address);
    this.setState({ copied: true });
  }

  render() {
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
              <Button className="modal-button" onClick={() => this.copyAddress()} disabled={this.state.copied}>
                {this.state.copied ? 'Copied' : 'Copy Address'}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    ) : (
      <h3 className="color-white">Loading...</h3>
    )
  }
}

const mapStateToProps = storeState => {
  return { user: storeState.listState.single }
}

export default withRouter(connect(mapStateToProps, { userData })(UserDetails))