import { HttpException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'modules/post/post.module';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      errorFormatter: execution => {
        const [error] = execution.errors; // take first error
        const originalError = error?.originalError;
        if (originalError instanceof HttpException)
          return {
            statusCode: originalError.getStatus(),
            response: { data: originalError.getResponse() as any },
          };
        return { statusCode: 500, response: execution };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/entities/*.entity.js'],
      logging: true,
      synchronize: true,
    }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
