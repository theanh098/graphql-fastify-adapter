import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BaseDocument {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdDate: Date;
}
