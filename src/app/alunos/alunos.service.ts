import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.dto';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(environment.api + 'alunos')
  }

  public getOne(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(environment.api + 'alunos/' + id)
  }

  public save(aluno: Aluno): Observable<Aluno> {
    if (aluno.id) {
      return this.http.put<Aluno>(
        environment.api + 'alunos/' + aluno.id,
        aluno
      )
    }
    return this.http.post<Aluno>(environment.api + 'alunos', aluno)
  }

  public delete(id: number) {
    return this.http.delete(environment.api + 'alunos/' + id)
    // return this.http.delete(environment.api + 'categories/' + id);
  }

  // public delete(id: número) {
  //   return this.http.delete(environment.api + 'categories/' + id);
  //   }
}
