import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class PlayedStory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  storyId: string;

  @Column()
  userId: string;

  @Column()
  userSteps: number;

  @Column()
  userTime: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
