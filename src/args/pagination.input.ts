import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class PaginatedInput {
  @Field(() => Int)
  @IsInt()
  @Max(100)
  limit: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number;
}
