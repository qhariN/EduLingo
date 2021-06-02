import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OptionQuestion } from './option-question';

@Entity('option')
export class Option {

    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column()
    name: string

    @Column({ length: 300, nullable: true })
    url: string

    @OneToMany(type => OptionQuestion, optionQuestion => optionQuestion.option)
    option_question: OptionQuestion[]

}