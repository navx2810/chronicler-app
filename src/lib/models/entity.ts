import { observable, computed, action } from "mobx"
import * as _ from "lodash"
import { v4 } from "node-uuid"

export class EntityData {
    @observable name: string
    id: string = v4()

    constructor(name: string) { this.name = name }
}

export class Entity {

    @observable data: EntityData
    @observable properties: Object = {}
    /** The list of IDs belonging to the entries that have linked to this [[Entity]] */
    @observable mentions: Array<string>

    constructor(name: string) {
        this.data = new EntityData(name)
    }

}