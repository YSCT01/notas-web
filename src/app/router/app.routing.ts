import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from '../components/home/home.component';
import { ErrorComponent } from '../components/error/error.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AddNoteComponent } from '../components/add-note/add-note.component';
import { EditNoteComponent } from '../components/edit-note/edit-note.component';
import { AllNotesComponent } from '../components/all-notes/all-notes.component';
import { DetailNoteComponent } from '../components/detail-note/detail-note.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { AboutComponent } from '../components/about/about.component';

const appRoutes: Routes=[
    {path: '', component:HomeComponent},
    {path: 'inicio', component:HomeComponent},
    {path: 'registrate', component:SignupComponent},
    {path: 'ingresa', component:LoginComponent},
    {path: 'notas', component:AllNotesComponent},
    {path: 'notas/crearNota', component:AddNoteComponent},
    {path: 'notas/editar/:id', component:EditNoteComponent},
    {path: 'notas/detalle/:id', component:DetailNoteComponent},
    {path: 'perfil/:email', component:ProfileComponent},
    {path: 'perfil/editar/:email', component:EditProfileComponent},
    {path: '**', component:ErrorComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
