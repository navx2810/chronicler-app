import React = require("react")
import { observer } from "mobx-react"
import { Entry, UI } from "../../lib/models"
import Colors from "../../lib/colors"
import * as Radium from "radium"
import { GetMatchesForPattern, JSONDisplay } from "../../lib/utils"

interface Props {
    ui: UI
}

/** Side bar navigation options. See [[UI]] */
export class PageNav extends React.Component<Props,{}> {
    
}