import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDocument } from './base._entity';
import { User } from './user.entity';

@Entity('comments')
@ObjectType()
export class Comment extends BaseDocument {
  @Column()
  @Field()
  naijo: string;

  @Column()
  @Field(() => Int)
  rate: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;
}
