import { Question } from "../../../model/question";
import { Unit } from "../../../model/unit";

export const unitStub = (): Unit => {
    return {
        id: 1,
        url: 'egg.svg',
        number: 1,
        status: 1,
        section: null
    }
}

export const questionStub = (): Question => {
    return {
        id: 62,
        question: 'Escribe esto en español',
        text: 'I need a menu, please',
        type: 2,
        img_url: 'https://d2pur3iezf4d1j.cloudfront.net/images/f4639160abfb44c54829ebeb62c0542d',
        status: 1,
        option_question: null
    }
}