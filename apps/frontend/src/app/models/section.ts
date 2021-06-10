//import { Sesion,sesiones1,sesiones2,sesiones3,sesiones4,sesiones5} from '../models/session';
import {Session} from '../models/session';

export interface Section{
    id:         string
    order:      number
    session:    Session[]
    active:     boolean
}
