export interface Skill {

    id:          number
    url:         string
    name:        string
    number:      number
    url_content: string
    question:    Question[]

}

export interface Question {

    id:              number
    question:        string
    text:            string
    type:            number
    option_question: OptionQuestion[]

}

export interface OptionQuestion {

    id:          number
    flag_estado: number
    order:       number
    option:      Option
    check:       boolean    //* used for checkbox

}

export interface Option {
    
    id:   number
    name: string
    url:  string
    
}