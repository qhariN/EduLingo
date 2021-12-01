import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Progress } from './progress';
import { Question } from './question';
import { Section } from './section';

@Entity('session')
export class Session {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 300 })
    url?: string

    @Column()
    name?: string

    @Column()
    number?: number

    @Column({ length: 300, nullable: true })
    url_content?: string

    @Column({ default: 1 })
    status?: number //! 0 = no available ; 1 = available

    @ManyToOne(type => Section, section => section.session)
    section?: Section

    @OneToMany(type => Progress, progress => progress.session)
    progress?: Progress[]

    @OneToMany(type => Question, question => question.session)
    question?: Question[]

}