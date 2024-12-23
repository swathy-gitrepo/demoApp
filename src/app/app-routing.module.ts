import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './features/contacts/contact-list/contact-list.component';
import { AddContactComponent } from './features/contacts/add-contact/add-contact.component';
import { EditContactComponent } from './features/contacts/edit-contact/edit-contact.component';
import { LoginComponent } from './features/auth/login-component/login-component.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'home',
    component : ContactListComponent
  },
  {
    path : 'addContact',
    component : AddContactComponent
  },
  {
    path : 'editContact/:id',
    component : EditContactComponent
  },
  {
    path : 'deleteContact/:id',
    component : ContactListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
