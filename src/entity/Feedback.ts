import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity("feedback")
export class Feedback {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  title: string;

  @Column({ default: "" })
  imageUrl: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false })
  isHide: Boolean;
}
