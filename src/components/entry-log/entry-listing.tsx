import React = require("react")
import { observer } from "mobx-react"
import { Entry } from "../../lib/models"
import Colors from "../../lib/colors"
import * as Radium from "radium"
import { GetMatchesForPattern, JSONDisplay } from "../../lib/utils"

interface Props {
    entry: Entry
}

enum Type {
    Object,
    Person
}

@observer
@Radium
export class EntryListing extends React.Component<Props,{}> {

    style = {
        padding: ".5em",
        color: "#eeeeee",
        background: Colors.background,
        discrepancy: { color: Colors.entry.problem },
        tags: {
            linked: {
                object: { borderBottom: `2px dotted ${Colors.entry.blue}` },
                player: { borderBottom: `2px dotted ${Colors.entry.linked}` },
            },
            unlinked: {
                borderBottom: `2px dotted ${Colors.entry.unlinked}`
            }
        }
    }

    render() {
        const { entry } = this.props

        let matches = entry.contents.match(Entry.NOTHING_PATTERN).filter( m => m !== "" )
        let tags = []

        matches.forEach( (match, index) => {
            if( entry.contains(match) ) { tags.push(this.createLinkedTag(match, index, entry)) }
            else { tags.push( <span key={`${match}:${index}`} >{match}</span> ) }
        })

        return (
            <div style={ (entry.hasOddities) ? [this.style, this.style.discrepancy] : this.style } key={entry.id}>{tags}</div>
        )
    }

    createLinkedTag(name: string, index: number, entry: Entry) {
        let name_exists = entry.linkedMetadata.players.some( p => p.name === name )
        let object_exists = entry.linkedMetadata.objects.some( o => o.name === name )
        return (name_exists || object_exists) ? <span style={ (name_exists) ? this.style.tags.linked.player : this.style.tags.linked.object } key={`${name}:${index}`} href="#">{name}</span> : <span style={ this.style.tags.unlinked } key={`${name}:${index}`} href="#">{name}</span>
    }
}