import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { bootstrap } from './main';

// Mocking NestFactory
jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      listen: jest.fn(),
    }),
  },
}));

describe('Main.ts bootstrap', () => {
  it('should call NestFactory.create and app.listen with correct port', async () => {
    const mockListen = jest.fn();
    const mockApp = { listen: mockListen }; // Mocked app object

    // Ensure that NestFactory.create returns the mock app
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);

    // Call the bootstrap function
    await bootstrap();

    // Assert that create was called with the AppModule
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);

    // Assert that listen was called with the expected port
    expect(mockListen).toHaveBeenCalledWith(process.env.PORT ?? 3000);
  });
});
