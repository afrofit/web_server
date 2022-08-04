import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Chapter {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  audioInstruction: string;

  @Column()
  storyId: string;

  @Column({ unique: true })
  order: number;

  @Column()
  targetSteps: number;

  @Column({ type: "text" })
  instruction: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
