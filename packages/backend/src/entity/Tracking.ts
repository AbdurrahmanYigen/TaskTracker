import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';

@Entity()
export class Tracking {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text', nullable: true })
    description: string;
    @Column()
    startTime: Date;
    @Column()
    endTime: Date;
    @CreateDateColumn()
    createdAt: string;
    @UpdateDateColumn()
    updatedAt: string;
    @ManyToOne(() => Task, (task) => task.trackings)
    task: Task;
}
