import React,{Component} from 'react'

export default class Message extends Component {
  render(){

    const {match } = this.props

    return <div>
        <p>Message</p>
        {match.params.id}
    </div>
  }
}
