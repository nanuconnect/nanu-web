import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { userDataByCode } from '../redux/actions/userAction'

class Home extends Component {

  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    if (query.get('b')) {
      this.props.userDataByCode(query.get('b'))
    }
  }

  render() {
    console.log(this.props.username)
    if (this.props.username === undefined) {
      window.alert('Bracelet has not been linked');
    }
    return (this.props.username ?
      <Redirect to={`/${this.props.username}`} />
      : <h3 className="color-white">Loading...</h3>
    )
  }
}

const mapStateToProps = storeState => {
  return { username: storeState.listState.username }
}

export default withRouter(connect(mapStateToProps, { userDataByCode })(Home))