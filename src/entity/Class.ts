import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("classes")
export class Class {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: true })
  title: string;

  @Column({ default: true })
  description: string;

  @Column({ unique: true })
  imageUrl: string;

  @Column({ default: true })
  videoUrl: string;

  @Column({ default: true })
  isHide: Boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
