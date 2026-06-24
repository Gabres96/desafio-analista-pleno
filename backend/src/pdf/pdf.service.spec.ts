import { Test, TestingModule } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import { ListVelorioDto } from '../velorios/dto/list-velorio.dto';

const mockVelorio: ListVelorioDto = {
  id: '1',
  nomeCompleto: 'João Silva',
  sala: 'Sala Lírio',
  horarioInicioVelorio: '2024-01-15T10:00:00.000Z',
  horarioInicioSepultamento: '2024-01-15T14:00:00.000Z',
  localSepultamento: 'Cemitério Municipal',
  funerariaResponsavel: 'Funerária Bom Pastor',
  numeroRegistro: 'REG-2026-0001',
};

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfService],
    }).compile();

    service = module.get<PdfService>(PdfService);
  });

  describe('generateBanner', () => {
    it('should return a non-empty Buffer', async () => {
      const result = await service.generateBanner(mockVelorio);

      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should produce a valid PDF (starts with PDF header)', async () => {
      const result = await service.generateBanner(mockVelorio);

      expect(result.toString('ascii', 0, 4)).toBe('%PDF');
    });

    it('should generate valid PDF when sepultamento date is empty', async () => {
      const velorio = { ...mockVelorio, horarioInicioSepultamento: '' };

      const result = await service.generateBanner(velorio);

      expect(result).toBeInstanceOf(Buffer);
      expect(result.toString('ascii', 0, 4)).toBe('%PDF');
    });
  });
});
