import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/files`;

  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const data = new FormData();
    data.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
