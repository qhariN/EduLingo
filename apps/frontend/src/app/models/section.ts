import {Session} from '../models/session';

export interface Section {

    id:         string
    order?:     number
    session?:   Session[]
    active?:    boolean
    nSessions?: number
    
}
