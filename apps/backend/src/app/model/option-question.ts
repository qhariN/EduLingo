import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from './option';
import { Question } from './question';

@Entity('option_question')
export class OptionQuestion {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    flag_estado: number

    @Column({ nullable: true })
    order: number

    @Column({ default: 1 })
    status: number //! 0 = no available ; 1 = availables

    @ManyToOne(type => Question, question => question.option_question)
    question: Question

    @ManyToOne(type => Option, option => option.option_question)
    option: Option

}