import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('contact')
export class Contact {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: true })
  name: string;

  @Column({ default: true })
  email: string;

  @Column({ default: true })
  number: string;

  @Column({ default: true })
  isRegistered: boolean;

  @Column({ default: true })
  moreInformation: boolean;

  @Column({ default: true })
  productEnquiry: string;

  @Column({ default: true })
  reason: string;

  @Column({ default: true })
  answer: string;

  // 1 padding, 2 completed
  @Column({ default: true })
  status: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
