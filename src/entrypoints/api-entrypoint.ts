import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import { TransformInterceptor } from 'infrastructure/middleware/interceptors/transform.interceptor';
import { ApiModule } from 'infrastructure/modules/api.module';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    try {
      const expressApp = express();
      const adapter = new ExpressAdapter(expressApp);

      const app = await NestFactory.create(ApiModule, adapter);

      // NOTE: Middleware
      app.use(eventContext());
      app.useGlobalPipes(new ValidationPipe());
      app.useGlobalInterceptors(new TransformInterceptor());
      app.use(cookieParser());
      app.use(helmet());

      // NOTE: Versioning
      app.enableVersioning({
        type: VersioningType.URI,
      });

      // NOTE: Swagger API documentation
      const config = new DocumentBuilder().build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('docs', app, document);

      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
      await app.init();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.resolve(cachedServer);
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
