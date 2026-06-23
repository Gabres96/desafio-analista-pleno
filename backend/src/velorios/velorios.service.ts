import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryResultRow } from 'pg';
import { DatabaseService } from '../database/database.service';
import { ListVelorioDto } from './dto/list-velorio.dto';

interface VelorioRow extends QueryResultRow {
  id: string;
  nomeCompleto: string;
  sala: string | null;
  horarioInicioVelorio: Date;
  horarioInicioSepultamento: Date | null;
  localSepultamento: string;
  funerariaResponsavel: string;
  numeroRegistro: string;
}

const BASE_QUERY = `
  SELECT
    v.id::text,
    p.nome || ' ' || p.sobrenome AS "nomeCompleto",
    v.sala_velorio                AS "sala",
    v.inicio_velorio              AS "horarioInicioVelorio",
    v.inicio_sepultamento         AS "horarioInicioSepultamento",
    v.local_sepultamento          AS "localSepultamento",
    ro.funeraria                  AS "funerariaResponsavel",
    ro.numero_registro            AS "numeroRegistro"
  FROM velorios v
  INNER JOIN registros_obitos ro ON ro.id = v.registro_obito_id
  INNER JOIN pessoas p ON p.id = ro.pessoa_id
`;

@Injectable()
export class VeloriosService {
  constructor(private readonly db: DatabaseService) {}

  async findActive(registro?: string): Promise<ListVelorioDto[]> {
    const { rows } = await this.db.query<VelorioRow>(
      `${BASE_QUERY}
       WHERE v.inicio_velorio <= NOW()
         AND (v.fim_velorio IS NULL OR v.fim_velorio > NOW())
         AND ($1::text IS NULL OR ro.numero_registro = $1)
       ORDER BY v.inicio_velorio ASC`,
      [registro ?? null],
    );
    return rows.map((r) => this.toDto(r));
  }

  async findById(id: string): Promise<ListVelorioDto> {
    const { rows } = await this.db.query<VelorioRow>(
      `${BASE_QUERY} WHERE v.id = $1`,
      [id],
    );
    if (!rows[0]) throw new NotFoundException(`Velório ${id} não encontrado`);
    return this.toDto(rows[0]);
  }

  private toDto(row: VelorioRow): ListVelorioDto {
    return {
      id: row.id,
      nomeCompleto: row.nomeCompleto,
      sala: row.sala ?? '',
      horarioInicioVelorio: row.horarioInicioVelorio.toISOString(),
      horarioInicioSepultamento:
        row.horarioInicioSepultamento?.toISOString() ?? '',
      localSepultamento: row.localSepultamento,
      funerariaResponsavel: row.funerariaResponsavel,
      numeroRegistro: row.numeroRegistro,
    };
  }
}
