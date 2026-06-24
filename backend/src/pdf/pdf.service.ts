import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { ListVelorioDto } from '../velorios/dto/list-velorio.dto';

@Injectable()
export class PdfService {
  generateBanner(velorio: ListVelorioDto): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 60 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc
        .fontSize(28)
        .font('Helvetica-Bold')
        .text('Memorial Luto Curitiba', { align: 'center' });

      doc.moveDown(1.5);
      doc.moveTo(60, doc.y).lineTo(535, doc.y).stroke();
      doc.moveDown(1.5);

      doc
        .fontSize(22)
        .font('Helvetica-Bold')
        .text(velorio.nomeCompleto, { align: 'center' });

      doc.moveDown(2);

      this.addField(
        doc,
        'Início do Velório',
        this.formatDate(velorio.horarioInicioVelorio),
      );
      this.addField(
        doc,
        'Início do Sepultamento',
        this.formatDate(velorio.horarioInicioSepultamento),
      );
      this.addField(doc, 'Local do Sepultamento', velorio.localSepultamento);
      this.addField(doc, 'Funerária Responsável', velorio.funerariaResponsavel);

      doc.end();
    });
  }

  private addField(
    doc: PDFKit.PDFDocument,
    label: string,
    value: string,
  ): void {
    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(`${label}:`, { continued: true });
    doc.fontSize(11).font('Helvetica').text(` ${value}`);
    doc.moveDown(0.8);
  }

  private formatDate(iso: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
  }
}
