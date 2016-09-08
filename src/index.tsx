import * as React from "react"
import { render } from "react-dom"
import { observer } from "mobx-react"
import { JSONDisplay } from "./lib/utils"
import { Application } from "./lib/models"
import {EntryLog, Modal, EntityModal} from "./components"

declare var window: any

const Data = new Application()
window.model = Data

const App = observer(() => (
    <div>
        <EntryLog logs={Data.campaign.log}/>
        <JSONDisplay>{Data}</JSONDisplay>
        <JSONDisplay>{{"unknownPlayers": Data.campaign.allUnknownPlayers}}</JSONDisplay>
        <JSONDisplay>{{"unknownObjects": Data.campaign.allUnknownObjects}}</JSONDisplay>
        <Modal data={Data.ui.modals}/>
    </div>
))

render(<App />, document.getElementById("app"))

window.useTestData = () => {
    Data.addToLog("<Jason> and <Todd> went on a quest together.")
    Data.addToLog("After encoutering some [Terrible Orcs], <Todd> died in battle.")
    Data.addToLog("The battle left <Jason> scarred, but he managed to grab some sweet loot. One of which was a [Golden Shortsword]")
    Data.addToLog("Sadly, the [Golden Shortsword] turned out to be nothing more than a [Shitty Dagger]")
    Data.addToLog('<Jason> thought to himself, *"I could swindle <Mark> with this [Shitty Dagger]"*')
    Data.campaign.addPlayer("Jason")
    Data.ui.modals = <EntityModal entity={Data.campaign.players[0]}/>
    
}

window.testOnlyObjects = () => {
    Data.addToLog("A wild [Short sword] and [Wooden dagger] appears")
}

window.a = () => {
    Data.campaign.addObject("Shitty Dagger")
}

window.b = () => { Data.campaign.addPlayer("Jason") }

window.c = () => { Data.campaign.addPlayers(Data.campaign.allUnknownPlayers); Data.campaign.addObjects(Data.campaign.allUnknownObjects) }

window.discrep = () => {
    window.c()
    Data.campaign.log[0].contents = "<Mark> and <Todd> went on a quest together."
    Data.campaign.players[1].data.name = "Jack"
}

window.useTestData()