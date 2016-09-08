import * as React from "react"
import { observer } from "mobx-react"

@observer
export class JSONDisplay extends React.Component<{},{}> {
    render() { return <pre>{JSON.stringify(this.props.children, null, '\t')}</pre> }
}