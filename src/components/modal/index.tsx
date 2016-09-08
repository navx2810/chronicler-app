import React = require("react")
import { observer } from "mobx-react"
import { computed, observable } from "mobx"
import Colors from "../../lib/colors"
import * as Radium from "radium"

interface Props {
    onClose?: () => void
    data: any
}

@Radium
@observer
export class Modal extends React.Component<Props,{}> {

    get dataExists(): boolean {  return (!!this.props.data) }

    style = {
        main: {
            display: "",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0, .5)",
            position: "fixed",
            top: "0px",
            left: "0px",
            overflow: "auto",
            width: "100%",
            height: "100%",
            zIndex: "1",
        },
        content: {
            flex: "0 0 auto",
            padding: "1em",
            background: Colors.foreground,
            color: "#ffffff"
        },
        header: {
            flex: "0 0 auto",
            background: Colors.foreground,
            color: "#ffffff"
        }

    }

    render() {

        let inner_content = ( !!this.props.data ) ? this.createModals(this.props.data) : null
        this.style.main.display = this.dataExists ? "flex" : "none"

        return (
            <div style={this.style.main}>
                <div style={this.style.header}>Top bar</div>
                {inner_content}
            </div>
        )
    }

    createModals(data: Object|Array<any>) {
        if ( data instanceof Array ) return data.map( d => <div style={this.style.content}>{d}</div> )
        else return <div style={this.style.content}>{data}</div>
    }

}