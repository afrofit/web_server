import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // OneToOne,
  // JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
// import { User } from "./User";

@Entity()
export class LeaderboardScore extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  leaderboardId: string;

  @Column({ default: 0 })
  bodyMovements: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
