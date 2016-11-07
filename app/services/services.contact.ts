import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Contact } from '../models/contact-model';
import { Observable } from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class ContactService {
    private _url = 'http://localhost/lara/ContactApp/public/index.php/contacts';  // URL to web API
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }
    create(model: Contact): Observable<any> {
        return this.http.post(this._url, JSON.stringify(model), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    }
    //#####################################################################
    getContacts(page: number, sort: String, field: String): Observable<any> {
        return this.http.get(this._url, { search: "page=" + page + "&sort=" + sort + "&field=" + field })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}