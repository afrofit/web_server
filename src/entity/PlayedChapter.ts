import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class PlayedChapter {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  chapterId: string;

  @Column()
  playedStoryId: string;

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
