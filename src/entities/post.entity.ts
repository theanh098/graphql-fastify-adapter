import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseDocument } from './base._entity';
import { User } from './user.entity';

@Entity('posts')
@ObjectType()
export class Post extends BaseDocument {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  naijo: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  @ManyToOne(() => User, author => author.posts)
  @JoinColumn({ name: 'authorId' })
  @Field(() => User)
  author: User;

  // OutSide Table
  @Field(() => Int)
  avgRate: number;
}
