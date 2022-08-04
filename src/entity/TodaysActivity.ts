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

  @Column()
  bodyMovements: number;

  @Column()
  caloriesBurned: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
