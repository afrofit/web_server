import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Performance {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column({ default: 0 })
  caloriesBurned: number;

  @Column({ default: 0 })
  daysActive: number;

  @Column({ default: 0 })
  totalUserSteps: number;

  @Column({ default: 0 })
  totalUserTime: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
