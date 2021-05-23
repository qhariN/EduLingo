import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OptionQuestion } from './option-question';

@Entity('option')
export class Option {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(type => OptionQuestion, optionQuestion => optionQuestion.option)
    option_question: OptionQuestion[]

}