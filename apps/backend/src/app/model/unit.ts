import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section';

@Entity('unit')
export class Unit {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 300 })
    url: string

    @Column()
    number: number

    @Column()
    status: number //! 0 = no available ; 1 = available

    @OneToMany(type => Section, section => section.unit)
    section: Section[]

}