import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginatedInput } from 'args/pagination.input';
import { PaginatedPost } from 'common/pagination';
import { Post } from 'entities/post.entity';
import { User } from 'entities/user.entity';
import { PostService } from './post.service';

// @ResolveField use case
// Resolver for Post schema
@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => PaginatedPost, { name: 'posts' })
  getPosts(@Args() args: PaginatedInput): Promise<PaginatedPost> {
    return this.postService.findPosts(args);
  }

  @ResolveField('author', () => User) // resolver for author field of Post schema
  getAuthor(@Parent() { id }: Post): Promise<User> {
    return this.postService.findAuthor(id);
  }
}
