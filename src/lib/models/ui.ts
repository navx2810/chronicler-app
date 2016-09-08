import { observable, computed, action } from "mobx"
import * as _ from "lodash"
import { v4 } from "node-uuid"
import * as Models from "./index.ts"

enum Location {
    Log,
    Entities,
    Options
}

export class UI {

    @observable selectedEntity: Models.Entity = null
    @observable location: Location = Location.Log
    @observable modals: Object|Array<any> = null
    

}