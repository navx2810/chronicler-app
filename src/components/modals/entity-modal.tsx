import React = require("react")
import { observer } from "mobx-react"
import { computed, observable } from "mobx"
import { Entity } from "../../lib/models"
import Colors from "../../lib/colors"
import * as Radium from "radium"

interface Props {
    entity: Entity
}

@Radium
@observer
export class EntityModal extends React.Component<Props,{}> {

    style = {
        main: {
            display: "flex",
            margin: "1em",
            flexDirection: "column"
        },
        entry: {
            background: "#666666",
            padding: ".5em",
            margin: ".25em",
            borderRadius: ".25em",
        }
    }

    render() {
        const { properties, data } = this.props.entity
        const { name, id } = data
        return (
            <div style={this.style.main}>
                <div style={this.style.entry} >Name: {name}</div>
                <div style={this.style.entry}>ID: {id}</div>
                <div style={this.style.entry}>Data: {JSON.stringify(properties, null, '\t')}</div>
            </div>
        )
    }



}