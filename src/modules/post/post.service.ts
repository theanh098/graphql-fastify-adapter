import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedInput } from 'args/pagination.input';
import { PaginatedPost } from 'common/pagination';
import { Post } from 'entities/post.entity';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async findPosts({ page, limit }: PaginatedInput): Promise<PaginatedPost> {
    const [data, totalCount] = await this.postRepository.findAndCount({
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

  async findAuthor(postId: number): Promise<User> {
    const { author } = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: {
        author: true,
      },
    });

    return author;
  }
}
