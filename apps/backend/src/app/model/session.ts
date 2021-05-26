import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Progress } from './progress';
import { Question } from './question';
import { Section } from './section';

@Entity('session')
export class Session {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 300 })
    url: string

    @Column()
    name: string

    @Column({ length: 300 })
    url_content: string

    @ManyToOne(type => Section, section => section.session)
    section: Section

    @OneToMany(type => Progress, progress => progress.session)
    progress: Progress[]

    @OneToMany(type => Question, question => question.session)
    question: Question[]

}