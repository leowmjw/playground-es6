/**
 * Created by leow on 6/15/16.
 */
import React from 'react'


export default class ListItem extends React.Component {

    render() {
        const {id, title, status} = this.props

        console.error("%s %s %s", id, title, status)
        return (
            <li>

                #{id} {title}
                <label><input type="checkbox" onChange={this.onChange.bind(this)}/> </label>
            </li>
        )
    }


    onChange() {
        console.error("Changed!! Status is ", this.title)
    }
}
