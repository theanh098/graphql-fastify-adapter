import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LoginInput } from 'args/login.input';
import { PaginatedInput } from 'args/pagination.input';
import { RegisterInput } from 'args/register.input';
import { PaginatedPost } from 'common/pagination';
import { User } from 'entities/user.entity';
import { LoginSuccess } from 'schemas/login.shema';
import { UserService } from './user.service';

@Resolver(() => User) // Resolver for User schema
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUser(id);
  }

  @ResolveField('posts', () => PaginatedPost) // Resolver for posts field of User schema
  postsByUser(@Parent() author: User, @Args() args: PaginatedInput) {
    return this.userService.findPostsByAuthor(author.id, args);
  }

  @Mutation(() => User, { nullable: true })
  register(@Args() args: RegisterInput) {
    return this.userService.createUser(args);
  }

  @Mutation(() => LoginSuccess, { nullable: true })
  login(@Args() args: LoginInput) {
    console.log('args: ', args);
    return {
      accessToken: 'cmm',
    };
  }
}
