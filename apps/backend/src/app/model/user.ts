import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Progress } from './progress';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(type => Progress, progress => progress.user)
    progress: Progress[]

}