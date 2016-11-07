//https://angular.io/docs/ts/latest/guide/server-communication.html
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ContactService } from '../../services/services.contact';

@Component({
    selector: 'contact-list',
    templateUrl: 'app/ui/contact/contact-list.htm',
    providers: [ContactService]
})
export class ContactList implements OnInit {

    data: any[] = [];
    errorMessage: String = "";
    current_page: number = 1;
    per_page: number = 10;
    total: number = 0;
    last_page: number = 0;
    next_page_url: string = "";
    prev_page_url: string = "";
    from:number=0;
    to:number=0;
    
    size: String = "10";
    sort: String = "id";
    dir: String = "asc";
    totalPages = 0;
    numberOfElements = 0;
    last = false;
    first = true;

    showNext(event: Event) {
        this.current_page++;
        this.getContacts();
    }
    doSort(sort: string) {
        this.current_page = 0;
        if (this.sort != sort) {
            this.dir = "asc";
        } else {
            this.dir = this.dir == "asc" ? "desc" : "asc";
        }
        this.sort = sort;
        this.getContacts();

    }
    showPrevious(event: Event) {
        this.current_page--;
        this.getContacts();
    }


    constructor(private contactservice: ContactService) { }
    ngOnInit(): void {
        this.getContacts();
    }
    getContacts(): void {
        this.contactservice.getContacts(this.current_page,   this.dir,this.sort)
            .subscribe(
            body => {
                this.data = <any>(body.data);
                this.per_page = <any>(body.per_page);
                this.total = <any>(body.total);
                this.last_page = <any>(body.last_page);
                this.next_page_url = <any>(body.next_page_url);
                this.prev_page_url = <any>(body.prev_page_url);
                this.from = <any>(body.from);
                this.to = <any>(body.to);
          
            },
            error => this.errorMessage = <any>error);
    }
}
