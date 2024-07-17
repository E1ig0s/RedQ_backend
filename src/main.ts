import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const swaggerCustomOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };
    const config = new DocumentBuilder().setTitle('backend example').setDescription('The backend API description').setVersion('1.0').addBearerAuth().build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, swaggerCustomOptions);

    await app.listen(4000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
