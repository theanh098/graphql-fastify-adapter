import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedInput } from 'args/pagination.input';
import { PaginatedPost } from 'common/pagination';
import { Post } from 'entities/post.entity';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findUser(id: number) {
    const user = await this.userRepository.findOneByOrFail({
      id,
    });

    return user;
  }

  async findPostsByAuthor(
    authorId: number,
    { limit, page }: PaginatedInput,
  ): Promise<PaginatedPost> {
    const [data, totalCount] = await this.postRepository.findAndCount({
      where: {
        authorId,
      },
      take: limit,
      skip: (page - 1) * page,
    });

    return {
      nodes: data,
      limit,
      page,
      totalCount,
      hasNextPage: limit * page < totalCount,
    };
  }
}
