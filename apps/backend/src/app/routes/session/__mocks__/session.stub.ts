import { Session } from "../../../model/session";

export const sessionStub = (): Session => {
    return {
        id: 1,
        url: 'egg.svg',
        name: 'Intro',
        number: 1,
        url_content: 'https://raw.githubusercontent.com/JeFop/Tips/master/unit-1/session-2.md',
        question: null
    }
}