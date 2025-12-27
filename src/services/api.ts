import axios, { type AxiosInstance } from 'axios';
import { type MarkType } from 'src/common/enums';
import type { DocumentRawData } from 'src/common/types';
import { useDocumentStore } from 'src/stores/document-store';

export const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000,
    });
  }

  async analyzeDocument(file: File): Promise<DocumentRawData> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  async getResult(documentId: string): Promise<DocumentRawData> {
    const response = await this.client.get(`/api/result/${documentId}`);
    return response.data;
  }

  async updateScene(sceneId: string, elementIndex: number, text: string): Promise<DocumentRawData> {
    const response = await this.client.patch(
      `/api/scene/${useDocumentStore().getDocumentId}/${sceneId}/${elementIndex}`,
      { text },
    );
    return response.data;
  }

  async markEpisode(
    episodeIndex: number,
    markType: MarkType,
    comment?: string,
  ): Promise<DocumentRawData> {
    const response = await this.client.post(
      `/api/episodes/${useDocumentStore().getDocumentId}/${episodeIndex}/mark`,
      {
        mark_type: markType,
        comment,
      },
    );
    return response.data;
  }

  async getPDFReport(): Promise<Blob> {
    const response = await this.client.post(
      `/api/report/${useDocumentStore().getDocumentId}/pdf`,
      {},
      {
        responseType: 'blob',
      },
    );
    return response.data;
  }
}

export default new ApiService();
