import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Label } from './Label';
import { Tracking } from './Tracking';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column({ type: 'text' })
    description: string;
    @CreateDateColumn()
    createdAt: string;
    @UpdateDateColumn()
    updatedAt: string;
    @OneToMany(() => Tracking, (tracking) => tracking.task)
    trackings: Tracking[];
    @ManyToMany(() => Label, (label) => label.tasks)
    @JoinTable() // owning side
    labels: Label[];

    getTrackings() {
        return this.trackings;
    }
}
