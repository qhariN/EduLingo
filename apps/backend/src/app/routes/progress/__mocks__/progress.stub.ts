import { Progress } from "../../../model/progress";

export const progressStub = (): Progress => {
    return {
        id: 1,
        session: { 
            id: 1 
        } 
    }
}

export const logStub = (): Object => {
    return {
        identifiers: null,
        generatedMaps: null,
        raw: null
     }
}