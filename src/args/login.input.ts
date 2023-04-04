import { ArgsType } from '@nestjs/graphql';
import { RegisterInput } from './register.input';

@ArgsType()
export class LoginInput extends RegisterInput {}
