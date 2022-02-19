import React from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { Link } from 'react-router-dom'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions () {
    const { id } = this.props.match.params
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
        <Link className="ui button" to="">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent() {
    //console.log(this.props.stream)
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?"
    } 
    return `Are you sure you want to delete ${this.props.stream.title}`
  }

  render () {
    return (
      <Modal 
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)