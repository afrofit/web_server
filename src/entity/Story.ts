import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

type DifficultyType = "easy" | "moderate" | "difficult";

@Entity()
export class Story {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  color: string;

  @Column()
  description: string;

  @Column()
  difficulty: DifficultyType;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  introVideo: string;

  @Column()
  introVideoAlt: string;

  @Column({ unique: true })
  order: number;

  @Column({ type: "text" })
  storySuccessText: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
