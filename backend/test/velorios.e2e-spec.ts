import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import supertest = require('supertest');
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('VeloriosController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /velorios', () => {
    it('should return all active velórios with correct DTO fields', async () => {
      const response = await supertest(app.getHttpServer())
        .get('/velorios')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const velorio = response.body[0];
        expect(velorio).toHaveProperty('id');
        expect(velorio).toHaveProperty('nomeCompleto');
        expect(velorio).toHaveProperty('sala');
        expect(velorio).toHaveProperty('horarioInicioVelorio');
        expect(velorio).toHaveProperty('horarioInicioSepultamento');
        expect(velorio).toHaveProperty('localSepultamento');
        expect(velorio).toHaveProperty('funerariaResponsavel');
        expect(velorio).toHaveProperty('numeroRegistro');
      }
    });

    it('should return only the matching velório when filtering by active registro', async () => {
      const response = await supertest(app.getHttpServer())
        .get('/velorios')
        .query({ registro: 'REG-2026-0001' })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      response.body.forEach((v: { numeroRegistro: string }) => {
        expect(v.numeroRegistro).toBe('REG-2026-0001');
      });
    });

    it('should return empty array for a non-existent registro', async () => {
      const response = await supertest(app.getHttpServer())
        .get('/velorios')
        .query({ registro: 'REG-9999' })
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return empty array for a finished velório registro', async () => {
      // REG-2026-0009 exists in the database but belongs to a finished velório
      const response = await supertest(app.getHttpServer())
        .get('/velorios')
        .query({ registro: 'REG-2026-0009' })
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /velorios/:id/banner', () => {
    it('should return a PDF with correct Content-Type header', async () => {
      const listResponse = await supertest(app.getHttpServer())
        .get('/velorios')
        .expect(200);

      if (listResponse.body.length === 0) return;

      const id: string = listResponse.body[0].id;

      await supertest(app.getHttpServer())
        .get(`/velorios/${id}/banner`)
        .expect(200)
        .expect('Content-Type', /application\/pdf/);
    });

    it('should return 404 for a non-existent velório id', async () => {
      await supertest(app.getHttpServer())
        .get('/velorios/99999/banner')
        .expect(404);
    });
  });
});
