import React from 'react'
import { connect } from 'react-redux'
import {change} from 'store/actions/parent'


const Nest = (props) => {
    console.log('nest props',props)
    return (
        <div>
            {props.name}
            <button onClick={() => props.changeName({name:"cu",age:"fd"})}>change info</button>
        </div>
    )
}

export default connect(
    (state) => ({name: state.person.name}),
    (dispath) => {
        return {
            changeName : payload => dispath(change(payload))
        }
    }
)(Nest)