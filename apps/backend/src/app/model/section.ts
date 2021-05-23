import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Unit } from './unit';
import { Session } from './session';

@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order: number

    @ManyToOne(type => Unit, unit => unit.section)
    unit: Unit

    @OneToMany(type => Session, session => session.section)
    session: Session[]

}