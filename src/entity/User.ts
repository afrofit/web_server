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
  BeforeUpdate,
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

  @Column("string", { default: true })
  imageUrl: string;

  @Column()
  password: string;

  @Column({ default: true })
  role: string;

  @Column({ default: true })
  pushSubscription: object;

  @Column({ default: true })
  isBlock: boolean;

  @Column({ default: true })
  isDeleted: boolean;

  @Column({ type: "text", nullable: true })
  password_reset_token: string;

  @Column()
  displayPicId: number;

  @Column({ default: true })
  lastStoryCompleted: number;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @Column({ nullable: true })
  notificationCount: number;

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
        imageUrl: this.imageUrl,
        role: this.role,
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "2h",
      }
    );
    return token;
  }

  @BeforeInsert()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
    if (!this.role) {
      this.role = "user";
    }
  }

  @BeforeInsert()
  async updateLastStoryCompleted(): Promise<void> {
    this.lastStoryCompleted = 0;
    this.isBlock = false;
    this.isDeleted = false;
  }
}
