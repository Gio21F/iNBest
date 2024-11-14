import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
    user!: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}