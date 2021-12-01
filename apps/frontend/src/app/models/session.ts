import { Progress } from "./progress";
import { Section } from "./section";

export interface Session {

    id?:            number
    name?:          string
    status?:        number
    number?:        number
    url?:           string
    url_content?:   string
    section?:       Section
    progress?:      Progress[]
    class?:         string
    
};
