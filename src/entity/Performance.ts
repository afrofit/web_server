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

  @Column()
  caloriesBurned: number;

  @Column()
  daysActive: number;

  @Column()
  totalUserSteps: number;

  @Column()
  totalUserTime: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
