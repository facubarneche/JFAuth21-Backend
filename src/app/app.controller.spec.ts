import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('Main', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      // Create NestJS app
      app = moduleFixture.createNestApplication();
    });

    it('should be defined', () => {
      expect(app).toBeDefined();
    });

    it('should listen on the correct port', async () => {
      const listenSpy = jest.spyOn(app, 'listen');

      const port = process.env.PORT ?? 8080;

      // Init the app
      await app.listen(port);

      // Verify app.listen is in the correct port
      expect(listenSpy).toHaveBeenCalledWith(port);
    });

    afterAll(async () => {
      // Close app after testing
      await app.close();
    });
  });
});
