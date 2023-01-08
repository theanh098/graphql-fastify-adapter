import { ArgsType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { User } from 'entities/user.entity';

@ArgsType() // if arg is a object use @InputType instead
export class RegisterInput implements Pick<User, 'password' | 'username'> {
  @Field()
  @IsAlpha()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
