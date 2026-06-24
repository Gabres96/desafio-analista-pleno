import axios from 'axios';
import type { ListVelorioDto } from '../types/velorio';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const api = {
  getVelorios: (registro?: string): Promise<ListVelorioDto[]> =>
    http
      .get('/velorios', { params: registro ? { registro } : undefined })
      .then((r) => r.data),

  downloadBanner: async (id: string, nomeCompleto: string): Promise<void> => {
    const response = await http.get(`/velorios/${id}/banner`, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = `banner-${nomeCompleto}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
