import { observable, computed, action, autorunAsync } from "mobx"
import * as _ from "lodash"
import { v4 } from "node-uuid"
import { GetMatchesForPattern } from "../utils"
import { EntityData } from "./index"

type Metadata = { players: Array<string>, objects: Array<string> }
type LinkedMetadata = { players: Array<EntityData>, objects: Array<EntityData> }
type SimplifiedMetadata = { players: Array<{name: string}>, objects: Array<{name: string}> }

export class Entry {

    static PLAYER_PATTERN = /\<([^\<\>\[\]]*)\>/g
    static OBJECT_PATTERN = /\[([^\<\>\[\]]*)\]/g
    static ALL_PATTERN = /[\<\[]([^\<\>\[\]]*)[\>\]]/g
    static NOTHING_PATTERN = /([^\<\[\>\]]*)/g

    id: string = v4()
    created: number = Date.now()
    @observable contents: string
    @observable linkedMetadata: LinkedMetadata = { players:[], objects:[] }
    @computed get metadata(): Metadata {
        const players = _.uniq( GetMatchesForPattern(Entry.PLAYER_PATTERN, this.contents) )
        const objects = _.uniq( GetMatchesForPattern(Entry.OBJECT_PATTERN, this.contents) )

        return { players, objects }
    }
    @observable hasOddities: boolean = false

    constructor(entry: string) {
        this.contents = entry

        autorunAsync(() => this.checkMetadata(this.metadata, this.linkedMetadata))
    }

    /** Checks to see if the name of a player or object exists in this entry
     * @param  {string} name The name of a player or object
     * @returns boolean True if the player or object exists, false if not
     */
    contains(name: string): boolean {
        let metadata = this.metadata

        let player_found = metadata.players.some( (p) => p === name )
        let object_found = metadata.objects.some( (o) => o === name)

        return player_found || object_found
    }

    /** Returns a simplified version with only the name of the metadata provided
     * @param  {SimplifiedMetadata} metadata The metadata to be simplified
     * @returns Metadata A simplified version of the metadata
     */
    simplifyMetadata(metadata: SimplifiedMetadata): Metadata { return { players: metadata.players.map( p => p.name ), objects: metadata.objects.map( o => o.name ) } }

    /** Checks the metadata and linked metadata for an inconsistencies, if any are found it flags the [[Entry.hasOddities]] flag
     * @param  {Metadata} metadata The metadata for the [[Entry]]
     * @param  {LinkedMetadata} linked The linked metadata containing [[Entity]] information
     */
    checkMetadata(metadata: Metadata, linked: LinkedMetadata) {
        if( _.isEmpty(linked.players) && _.isEmpty(linked.objects) || _.isEmpty(metadata.players) && _.isEmpty(metadata.objects) ) { return }
    
        const simplified_linked_metadata: Metadata = this.simplifyMetadata(linked)
        const equals = _.isEqual(simplified_linked_metadata, metadata)

        if(equals && this.hasOddities) { this.hasOddities = false }
        else if(!equals && !this.hasOddities) { this.hasOddities = true }
    }

    
    /** Gets the list of all the inconsistencies of the metadata and linked metadata
     * @returns Metadata
     */
    @computed get oddities(): Metadata {
        let simplified_linked_metadata: Metadata = this.simplifyMetadata(this.linkedMetadata)
        let metadata = this.metadata

        return { players: _.difference(metadata.players, simplified_linked_metadata.players), objects: _.difference(metadata.objects, simplified_linked_metadata.objects) }
    }
}
