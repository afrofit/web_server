import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TodaysActivity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column({ default: 0 })
  bodyMovements: number;

  @Column({ default: 0 })
  caloriesBurned: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
