import { Routes } from '@angular/router';
import { AlunosComponent } from './alunos/alunos.component';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { FormularioComponent } from './alunos/formulario/formulario.component';

export const routes: Routes = [
    {
        path: 'alunos',
        component: HomeComponent,
        children:
            [
                {
                    path: '',
                    component: AlunosComponent
                },
                {
                    path: ':id',
                    component: FormularioComponent
                }
            ]

    }
];
