import { observable, computed, action } from "mobx"
import * as _ from "lodash"
import { v4 } from "node-uuid"
import { Campaign, Entity, Entry, UI } from "./index.ts"

export class Application {

    @observable campaign: Campaign = new Campaign()
    @observable ui: UI = new UI()

    @action addToLog(contents: string) {
        this.campaign.log.push(new Entry(contents))
    }

}