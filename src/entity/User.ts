import argon2 from "argon2";
import jwt from "jsonwebtoken";

import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ type: "text", nullable: true })
  password_reset_token: string;

  @Column()
  displayPicId: number;

  @Column({ default: 0 })
  lastStoryCompleted: number;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @Column({ nullable: true })
  lastActiveSubscriptionId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  /* Functions */

  hashPassword(password: string = ""): Promise<string> {
    return argon2.hash(password);
  }

  verifyPassword(
    hashedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, suppliedPassword);
  }

  generateToken(): string {
    const token = jwt.sign(
      {
        userId: this.id,
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        displayPicId: this.displayPicId,
        joinDate: this.createdAt,
        lastStoryCompleted: this.lastStoryCompleted,
      },
      process.env.TOKEN_SECRET!
    );
    return token;
  }

  @BeforeInsert()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  @BeforeInsert()
  async updateLastStoryCompleted(): Promise<void> {
    this.lastStoryCompleted = 0;
  }
}
