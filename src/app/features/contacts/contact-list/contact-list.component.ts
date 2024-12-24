import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { catchError, Observable, of } from 'rxjs';
import { Contact } from '../Models/contactList';
import { HttpResponse } from '@angular/common/http';
import { HttpResponseMessage } from '../Models/HttpResponseMessage';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  contactList$? : Observable<Contact[]>;
  errorMessage: string = '';
  constructor(private contactService : ContactService,private cdRef: ChangeDetectorRef)
  {

  }
  ngOnInit(): void {
    this.contactList$ = this.contactService.getAllContacts().pipe(
      catchError((error) => {
        // Handle the error here
        this.errorMessage = 'Failed to load contacts. Please try again later.';
        console.error('Error fetching contacts:', error);
        // Return an empty observable so the template can handle gracefully
        return of([]);
      })
    );
  }
  deleteContact(fullName :string, contactId : number)
  {
    var result = confirm(`Are you sure to delete ${fullName} Contact ?`);
    if(result)
    {
      this.contactService.deleteContact(contactId).subscribe(
        {
          next : (response : any)=>
          {
            alert(response.reasonPhrase);
           this.cdRef.detectChanges(); 
            this.contactList$ = this.contactService.getAllContacts();
          },
          error : (error)=>
          {
            var errorObj = error.error;
            alert(errorObj.reasonPhrase);
          }
        }
      )
    }
  }
  sort(fieldName : string, sortDirection : string)
  {
    this.contactList$ = this.contactService.getAllContacts(fieldName,sortDirection);
  }

}
