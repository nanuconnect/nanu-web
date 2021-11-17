import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Modal.css'

class MobModal extends Component {
  openApp = () => {
    window.open("https://apps.apple.com/us/app/nanu/id1584423773", "_blank");
  }

  render() {
    return this.props.user ? (
      <>
        <div
          className={`mobile-modal text-center show`}
          id='exampleModal2'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel2'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content mobile-modal-content'>
              <div className='modal-body'>
                <div style={{ display: "flex" }}>
                  {/* <img src="/logo-mobile.png" alt="logo" /> */}
                  <img src={process.env.PUBLIC_URL + '/logo-mobile.png'} height="60" width="60" alt="logo" className="mobile-logo" />
                  <h5 className="modal-text mobile-modal-text color-white">
                    Share your crypto and cash payment options on Nanu!
                  </h5>
                </div>
                <button className="use-the-app-btn" onClick={this.openApp}>
                  Use the app
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null
  }
}

const mapStateToProps = storeState => {
  return { user: storeState.listState.single }
}

export default connect(mapStateToProps, null)(MobModal)