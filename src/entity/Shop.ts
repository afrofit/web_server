import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("shops")
export class Shop {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: true })
  title: string;

  @Column({ default: true })
  description: string;

  @Column({ default: true })
  imageUrl: string;

  @Column({ default: true })
  audioUrl: string;

  @Column({ default: true })
  isHide: Boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
