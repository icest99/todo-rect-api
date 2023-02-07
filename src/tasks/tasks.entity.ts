import { Status } from './../enums/Status';
import { Priority } from './../enums/Priority';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Priority } from '../enums/Priority';
// import { Status } from '../enums/Status';

//@Entity is TS-Decorator for using TypeORM
@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    date: string;

    @Column( {
        type: 'varchar',
        length: 2000,
    })
    description: string;

    @Column({
        type: 'enum',
        enum: Priority,
        default: Priority.medium,
    })
    priority: Priority;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.todo,
    })
    status: Status
} //disabled strictInit for this.