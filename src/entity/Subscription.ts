import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("subscription")
export class Subscription {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  stripeSubscriptionId: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
