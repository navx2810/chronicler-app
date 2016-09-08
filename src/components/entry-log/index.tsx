import React = require("react")
import { observer } from "mobx-react"
import {Entry} from "../../lib/models"
import {EntryListing} from "./entry-listing"
import * as Radium from "radium"

interface Props {
    logs: Array<Entry>
}

@observer
@Radium
export class EntryLog extends React.Component<Props,{}> {

    style = {
        overflow: "scroll"
    }

    render() {
        let logs = this.props.logs.map( l => <EntryListing key={l.id} entry={l}/> )

        return (
            <div style={this.style}>
            {logs}
            </div>
        )
    }
}