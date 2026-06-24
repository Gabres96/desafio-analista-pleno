import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { ListVelorioDto } from '../velorios/dto/list-velorio.dto';

@Injectable()
export class PdfService {
  generateBanner(velorio: ListVelorioDto): Buffer {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.end();

    this.renderBanner(doc, velorio);

    return Buffer.concat(chunks);
  }

  private renderBanner(doc: PDFKit.PDFDocument, v: ListVelorioDto): void {
    const formatDate = (iso: string) =>
      iso
        ? new Date(iso).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })
        : '—';

    doc
      .fontSize(22)
      .font('Helvetica-Bold')
      .text('Banner de Velório', { align: 'center' });

    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    doc
      .fontSize(28)
      .font('Helvetica-Bold')
      .text(v.nomeCompleto, { align: 'center' });

    doc.moveDown(1.5);

    const field = (label: string, value: string) => {
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .text(`${label}:`, { continued: true });
      doc.fontSize(11).font('Helvetica').text(` ${value}`);
      doc.moveDown(0.4);
    };

    field('Início do velório', formatDate(v.horarioInicioVelorio));
    field('Início do sepultamento', formatDate(v.horarioInicioSepultamento));
    field('Local de sepultamento', v.localSepultamento);
    field('Funerária responsável', v.funerariaResponsavel);
  }
}
