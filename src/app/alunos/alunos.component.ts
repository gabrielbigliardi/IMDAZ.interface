import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { AlunosDataSource, AlunosItem } from './alunos-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Aluno } from './aluno.dto';
import { AlunoService } from './alunos.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink]
})
export class AlunosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Aluno>;

  dataSource = new MatTableDataSource<Aluno>();

  alunos!: Aluno[]

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nomeAluno', 'cpf', 'nomeMae', 'action'];

  constructor(private alunoService: AlunoService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.carregarAlunos()

  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe({
      next: (data) => {
        this.alunos = data
        this.dataSource = new MatTableDataSource(data)
        this.table.dataSource = this.dataSource
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    })
  }


  deletarAluno(id: number) {
    console.log(id);

    this.alunoService.delete(id).subscribe()
    this.carregarAlunos()
  }

  onEditCategoryClick(l: any) { }


}
