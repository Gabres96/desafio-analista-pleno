import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { VeloriosController } from './velorios.controller';
import { VeloriosService } from './velorios.service';
import { PdfService } from '../pdf/pdf.service';
import { FilterVelorioDto } from './dto/filter-velorio.dto';
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
  let pdfService: jest.Mocked<PdfService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeloriosController],
      providers: [
        {
          provide: VeloriosService,
          useValue: { findActive: jest.fn(), findById: jest.fn() },
        },
        {
          provide: PdfService,
          useValue: { generateBanner: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<VeloriosController>(VeloriosController);
    veloriosService = module.get(VeloriosService);
    pdfService = module.get(PdfService);
  });

  describe('findActive', () => {
    it('should return active velorios without filter', async () => {
      veloriosService.findActive.mockResolvedValueOnce(mockVelorios);

      const result = await controller.findActive({} as FilterVelorioDto);

      expect(result).toEqual(mockVelorios);
      expect(veloriosService.findActive).toHaveBeenCalledWith(undefined);
    });

    it('should pass registro to service when provided', async () => {
      veloriosService.findActive.mockResolvedValueOnce([mockVelorios[0]]);

      const result = await controller.findActive({ registro: 'REG-2026-0001' });

      expect(result).toHaveLength(1);
      expect(veloriosService.findActive).toHaveBeenCalledWith('REG-2026-0001');
    });

    it('should return empty array when no velorios found', async () => {
      veloriosService.findActive.mockResolvedValueOnce([]);

      const result = await controller.findActive({
        registro: 'REG-INEXISTENTE',
      });

      expect(result).toEqual([]);
    });
  });

  describe('getBanner', () => {
    it('should generate and send PDF for a valid velorio', async () => {
      const mockPdf = Buffer.from('pdf-content');
      veloriosService.findById.mockResolvedValueOnce(mockVelorios[0]);
      pdfService.generateBanner.mockResolvedValueOnce(mockPdf);

      const res = { set: jest.fn(), end: jest.fn() } as unknown as Response;

      await controller.getBanner('1', res);

      expect(veloriosService.findById).toHaveBeenCalledWith('1');
      expect(pdfService.generateBanner).toHaveBeenCalledWith(mockVelorios[0]);
      expect(res.set).toHaveBeenCalledWith(
        expect.objectContaining({ 'Content-Type': 'application/pdf' }),
      );
      expect(res.end).toHaveBeenCalledWith(mockPdf);
    });
  });
});
