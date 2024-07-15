import { Aluno } from './../aluno.dto';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { AlunoService } from '../alunos.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {

  aluno!: Aluno
  formularioAluno!: FormGroup
  id!: number | string;

  constructor(private route: ActivatedRoute, private alunoService: AlunoService, private router: Router) {

  }

  private fb = inject(FormBuilder)


  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    if (this.id === 'new') {
      this.formularioVazio()
    } else {
      this.carregarAluno()
    }
  }

  formularioVazio() {
    this.formularioAluno = this.fb.group({
      id: [null],
      nomeAluno: [''],
      cpf: [''],
      nomeMae: [''],
      telefone: [''],
      idade: [null],
      nomeRua: [''],
      numeroCasa: ['']
    })
  }


  carregarAluno() {
    this.alunoService.getOne(this.id as number).subscribe({
      next: (data: Aluno) => {
        this.aluno = data
        this.criarFormularioSisExistente(data)

      }
    })
  }

  private criarFormularioSisExistente(aluno: Aluno) {
    this.formularioAluno = this.fb.group({
      id: [aluno.id],
      nomeAluno: [aluno.nomeAluno],
      cpf: [aluno.cpf],
      nomeMae: [aluno.nomeMae],
      telefone: [aluno.telefone],
      idade: [aluno.idade],
      nomeRua: [aluno.nomeRua],
      numeroCasa: [aluno.numeroCasa]
    })
    // console.log(this.formularioAluno);

  }


  salvarAluno() {
    this.alunoService.save(this.formularioAluno.value).subscribe()
    this.router.navigate(['/alunos'])
  }


}
