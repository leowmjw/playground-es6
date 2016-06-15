/**
 * Created by leow on 6/15/16.
 */
import React from 'react'
import List from './component/List'
// import NewTaskForm from './component/NewTaskForm'

export default class Application extends React.Component {
    constructor() {
        super()
        this.state = {data: []}
    }

    componentWillMount() {
        const todos = [
            {
                "id": 1,
                "title": "foo",
                "status": 0
            },
            {
                "id": 2,
                "title": "var",
                "status": 1
            },
            {
                "id": 3,
                "title": "bob",
                "status": 0
            }
        ]
        this.setState({data: todos})
    }

    render() {
        return (
            <List data={this.state.data}/>
        )
    }
}

