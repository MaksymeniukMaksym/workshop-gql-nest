import { ProductResolver } from './product/product.resolver';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { AppModule } from './app.module';
import { printSchema } from 'graphql';


// async function generateSchema() {
//   const app = await NestFactory.create(GraphQLSchemaBuilderModule);
//   await app.init();

//   const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
//   const schema = await gqlSchemaFactory.create([ProductResolver]);
//   console.log(printSchema(schema));
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(3000);
}
bootstrap();

