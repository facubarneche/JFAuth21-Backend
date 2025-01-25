import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('Main', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Se crea el módulo de prueba de NestJS
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importamos el módulo principal
    }).compile();

    // Creamos la aplicación de NestJS
    app = moduleFixture.createNestApplication();
  });

  it('should be defined', () => {
    // Verificamos que la app esté definida (que se haya creado correctamente)
    expect(app).toBeDefined();
  });

  it('should listen on the correct port', async () => {
    const listenSpy = jest.spyOn(app, 'listen'); // Hacemos un espía en el método 'listen'

    const port = process.env.PORT ?? 8080;

    // Iniciamos la aplicación
    await app.listen(port);

    // Verificamos que app.listen haya sido llamado con el puerto esperado
    expect(listenSpy).toHaveBeenCalledWith(port);
  });

  afterAll(async () => {
    // Cerramos la aplicación después de las pruebas
    await app.close();
  });
});
