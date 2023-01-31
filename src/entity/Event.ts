import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("events")
export class Event {
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

  @Column({ unique: true })
  paymentLinks: string;

  @Column({ default: true })
  isHide: Boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
