import { endOfWeek, startOfWeek } from "date-fns";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";

@Entity()
export class Leaderboard {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  endDate: Date;

  @Column()
  startDate: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  calculateEndDate(): void {
    this.endDate = endOfWeek(new Date());
    this.startDate = startOfWeek(new Date());
  }
}
