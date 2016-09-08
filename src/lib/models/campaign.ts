import { observable, computed, action } from "mobx"
import * as _ from "lodash"
import { v4 } from "node-uuid"
import { Entry, Entity } from "./index.ts"

type AddResult = { entity: Entity, array: Array<Entity>, logs: Array<Entry> }

export class Campaign {

    id: string = v4()
    @observable log: Array<Entry> = []
    @observable players: Array<Entity> = []
    @observable objects: Array<Entity> = []

    /** Retrieves all of the unregistered players in the campaign */
    @computed get allUnknownPlayers() { 
        let log_players = []
        this.log.forEach( (log) => log.metadata.players.forEach( (player) => log_players.push(player) ) )
        let players_array = this.players.map( (player) => player.data.name )
        return _.uniq( _.difference(log_players, players_array) )
    }

    /** Retrieves all of the unregistered objects in the campaign */
    @computed get allUnknownObjects() {
        let log_objects = []
        this.log.forEach( (log) => log.metadata.objects.forEach( (object) => log_objects.push(object) ) )
        let objects_array = this.objects.map( (object) => object.data.name )
        return _.uniq( _.difference(log_objects, objects_array) )
    }

    /** A private method to add entities to a specific array, this is a helper method for [[Campaign.addPlayer]] and [[Campaign.addObject]]
     * @param  {string} name The name of the entity
     * @param  {Array<Entity>} array The container for the entity inside of the campaign
     * @returns A combination of the [[Entity]] created, the new sliced array, and the [[Entry]]s that need to be linkeds to the [[Entity]]
     */
    private add(name: string, array: Array<Entity>): AddResult {
        if ( array.some( (i) => i.data.name === name) ) { return }
        let logs = this.log.filter( (log) => log.contains(name) )
        let ids = logs.map( (entry) => entry.id ) || []

        let entity = new Entity(name)
        entity.mentions = ids
        array = _.uniq([...array, entity])

        return { entity, array, logs }
    }

    /** Adds a player with the given name
     * @param  {string} name The name of the player
     */
    addPlayer(name: string) {
        let { entity, array, logs } = this.add(name, this.players)
        this.players = array
        logs.forEach( (entry) => entry.linkedMetadata.players.push(entity.data) )
    }

    /** Adds all the players listed in the array 
     * @param  {Array<string>} names The names of the players
     */
    addPlayers(names: Array<string>) { names.forEach( n => this.addPlayer(n) ) }
    
    /** Adds an object with the given name
     * @param  {string} name The name of the object
     */
    addObject(name: string) {
        let { entity, array, logs } = this.add(name, this.objects)
        this.objects = array
        logs.forEach( (entry) => entry.linkedMetadata.objects.push(entity.data) )
    }
    
    /** Adds all objects listed in the array
     * @param  {Array<string>} names The name of the objects
     */
    addObjects(names: Array<string>) { names.forEach( n => this.addObject(n) ) }

}