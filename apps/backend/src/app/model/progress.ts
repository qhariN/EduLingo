import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Session } from './session';

@Entity('progress')
export class Progress {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status?: number //! 0 = no available ; 1 = available

    @Column()
    time?:number

    @Column()
    points_writing?:number

    @Column()
    points_listening?:number

    @Column()
    points_speaking?:number

    @ManyToOne(type => User, user => user.progress)
    user?: User

    @ManyToOne(type => Session, session => session.progress)
    session: Session

}