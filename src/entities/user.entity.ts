import { Field, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { ExcludePassword } from 'middlewares/excludePassword.middleware';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseDocument } from './base._entity';
import { Post } from './post.entity';

@Entity('users')
@ObjectType()
export class User extends BaseDocument {
  @Field()
  @Column()
  @IsAlpha()
  username: string;

  @Field({ nullable: true, middleware: [ExcludePassword] })
  @Column({ nullable: true })
  @IsNotEmpty()
  password?: string;

  @Field(() => [Post], { nullable: 'items' })
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
