import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './Models/contactList';
import { environment } from 'src/environments/environment';
import { HttpResponseMessage } from './Models/HttpResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }

  getAllContacts(sortBy?: string, sortDirection?: string) : Observable<Contact[]>
  {
    let params = new HttpParams();
    if (sortBy) {
      params = params.set('sortBy', sortBy)
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection)
    }
    return this.http.get<Contact[]>("https://localhost:7034/api/Contacts/getAllContacts",{
      params: params
    });
  }
  addContact(contactData : Contact) : Observable<Contact>
  {
    return this.http.post<Contact>("https://localhost:7034/api/Contacts/addContact",contactData);
  }
  getContactById(contactId : number) : Observable<Contact>
  {
    return this.http.get<Contact>(`https://localhost:7034/api/Contacts/getContactById/${contactId}`);
  }
  editContact(contactId : number,contactData : Contact) : Observable<HttpResponseMessage>
  {
    return this.http.put<HttpResponseMessage>(`https://localhost:7034/api/Contacts/updateContact/${contactId}`,contactData);
  }
  deleteContact(contactId : number) : Observable<HttpResponseMessage>
  {
    return this.http.delete<HttpResponseMessage>(`https://localhost:7034/api/Contacts/deleteContact/${contactId}`);
  }
}
