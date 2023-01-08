import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Post } from 'entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
