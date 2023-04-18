import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("feedback")
export class Feedback {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: true })
  name: string;

  @Column({ default: true })
  title: string;

  @Column({ default: true })
  imageUrl: string;

  @Column({ default: true })
  description: string;

  @Column({ default: true })
  isHide: Boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
