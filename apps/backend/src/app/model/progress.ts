import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Session } from './session';

@Entity('progress')
export class Progress {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status?: number //! 0 = no available ; 1 = available

    @ManyToOne(type => User, user => user.progress)
    user?: User

    @ManyToOne(type => Session, session => session.progress)
    session: Session

}