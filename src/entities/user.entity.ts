import { Field, ObjectType } from '@nestjs/graphql';
import { ExcludePassword } from 'middlewares/excludePassword.middleware';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseDocument } from './base._entity';
import { Post } from './post.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
@ObjectType()
export class User extends BaseDocument {
  @Field()
  @Column()
  username: string;

  @Field({ nullable: true, middleware: [ExcludePassword] })
  @Column({ nullable: true })
  password?: string;

  @Field(() => [Post], { nullable: 'items' })
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
