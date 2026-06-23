import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VeloriosService } from './velorios.service';
import { DatabaseService } from '../database/database.service';

const makeRow = (overrides = {}) => ({
  id: '1',
  nomeCompleto: 'João Silva',
  sala: 'Sala Lírio',
  horarioInicioVelorio: new Date('2024-01-15T10:00:00Z'),
  horarioInicioSepultamento: new Date('2024-01-15T14:00:00Z'),
  localSepultamento: 'Cemitério Municipal',
  funerariaResponsavel: 'Funerária Bom Pastor',
  numeroRegistro: 'REG-2026-0001',
  ...overrides,
});

describe('VeloriosService', () => {
  let service: VeloriosService;
  let dbQuery: jest.Mock;

  beforeEach(async () => {
    dbQuery = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeloriosService,
        { provide: DatabaseService, useValue: { query: dbQuery } },
      ],
    }).compile();

    service = module.get<VeloriosService>(VeloriosService);
  });

  describe('findActive', () => {
    it('should return active velorios as DTOs', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [makeRow()] });

      const result = await service.findActive();

      expect(result).toHaveLength(1);
      expect(result[0].nomeCompleto).toBe('João Silva');
      expect(result[0].horarioInicioVelorio).toBe(
        new Date('2024-01-15T10:00:00Z').toISOString(),
      );
    });

    it('should return empty array when no active velorios', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [] });

      const result = await service.findActive();

      expect(result).toEqual([]);
    });

    it('should pass registro filter to query', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [makeRow()] });

      await service.findActive('REG-2026-0001');

      expect(dbQuery).toHaveBeenCalledWith(
        expect.any(String),
        ['REG-2026-0001'],
      );
    });

    it('should pass null when no registro provided', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [] });

      await service.findActive();

      expect(dbQuery).toHaveBeenCalledWith(expect.any(String), [null]);
    });

    it('should handle null sala and sepultamento', async () => {
      dbQuery.mockResolvedValueOnce({
        rows: [makeRow({ sala: null, horarioInicioSepultamento: null })],
      });

      const result = await service.findActive();

      expect(result[0].sala).toBe('');
      expect(result[0].horarioInicioSepultamento).toBe('');
    });
  });

  describe('findById', () => {
    it('should return velorio DTO when found', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [makeRow()] });

      const result = await service.findById('1');

      expect(result.id).toBe('1');
      expect(result.nomeCompleto).toBe('João Silva');
    });

    it('should throw NotFoundException when velorio does not exist', async () => {
      dbQuery.mockResolvedValueOnce({ rows: [] });

      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });
});
