import { Test, TestingModule } from '@nestjs/testing';
import { VeloriosController } from './velorios.controller';
import { VeloriosService } from './velorios.service';
import { ListVelorioDto } from './dto/list-velorio.dto';

const mockVelorios: ListVelorioDto[] = [
  {
    id: '1',
    nomeCompleto: 'João Silva',
    sala: 'Sala Lírio',
    horarioInicioVelorio: '2024-01-15T10:00:00.000Z',
    horarioInicioSepultamento: '2024-01-15T14:00:00.000Z',
    localSepultamento: 'Cemitério Municipal',
    funerariaResponsavel: 'Funerária Bom Pastor',
    numeroRegistro: 'REG-2026-0001',
  },
];

describe('VeloriosController', () => {
  let controller: VeloriosController;
  let veloriosService: jest.Mocked<VeloriosService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeloriosController],
      providers: [
        {
          provide: VeloriosService,
          useValue: { findActive: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<VeloriosController>(VeloriosController);
    veloriosService = module.get(VeloriosService);
  });

  describe('findActive', () => {
    it('should return active velorios without filter', async () => {
      veloriosService.findActive.mockResolvedValueOnce(mockVelorios);

      const result = await controller.findActive();

      expect(result).toEqual(mockVelorios);
      expect(veloriosService.findActive).toHaveBeenCalledWith(undefined);
    });

    it('should pass registro to service when provided', async () => {
      veloriosService.findActive.mockResolvedValueOnce([mockVelorios[0]]);

      const result = await controller.findActive('REG-2026-0001');

      expect(result).toHaveLength(1);
      expect(veloriosService.findActive).toHaveBeenCalledWith('REG-2026-0001');
    });

    it('should return empty array when no velorios found', async () => {
      veloriosService.findActive.mockResolvedValueOnce([]);

      const result = await controller.findActive('REG-INEXISTENTE');

      expect(result).toEqual([]);
    });
  });
});
