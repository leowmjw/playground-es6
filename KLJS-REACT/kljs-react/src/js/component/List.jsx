/**
 * Created by leow on 6/15/16.
 */
import React from 'react'
import ListItem from './ListItem'
import util from 'util'

export default class List extends React.Component {
    render() {
        console.error(util.inspect(this.props))
        const listItems = this.props.data.map(
            (listItem) => {
                // return `<li>ABC</li>`
                // return <ListItem id={id} title={title} />
                return <ListItem key={listItem.id} {...listItem} />

            }
        )

        console.error("listItems", listItems)
        return (
            <ul>
                {listItems}
            </ul>
        )
    }
}