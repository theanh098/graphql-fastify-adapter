import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'entities/post.entity';

interface IPaginatedType<T> {
  nodes: T[];
  limit: number;
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: 'items' })
    nodes: T[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}
