import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should return status ok and api name', () => {
    expect(controller.root()).toEqual({
      status: 'ok',
      message: 'Dashboard de Velórios API',
    });
  });

  it('should return status ok on health check', () => {
    expect(controller.health()).toEqual({ status: 'ok' });
  });
});
