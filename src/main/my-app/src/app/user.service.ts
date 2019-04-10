import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Http, Response} from "@angular/http";

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }




  getUsers() {
    this.messageService.add('the list of user fetched susseccfully');
    return this.http.get<User[]>(this.userUrl + "/allUsers.do")
    // .map(
    //             (response: Response) => {
    //                 return response.json();
    //             }
    //         );
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );

  }
  getUser(id: number) {
    // this.messageService.add(`the user with id ${id} fetched susseccfully`);
    // return of(USERS.find(hero => user.id === id))
    const url = `${this.userUrl}/getUser.do/${id}`;
    return this.http.get<User>(url).pipe(
          tap(_ => this.log(`the user with id ${id} fetched susseccfully`)),
          catchError(this.handleError<User>(`getUser id = ${id}`))
        );

  }
  removeUser(id: number): void {
       this.http.get(this.userUrl + "/remove.do"+"/"+id)
       .pipe(
         tap(_ => this.log(`removed users with id = ${id}`)),
         catchError(this.handleError<User>(`removeUser id = ${id}`))
       );

  }
  registerUser(user: User){
    return this.http.post<User>(this.userUrl + "/register.do",user,httpOptions)
    .pipe(
      tap((newUser: User)=> this.log(`register user with id = ${newUser.id}`)),
      catchError(this.handleError<User>(`registerUser`))
    );
  }

  updateUser(user: User) {
    return this.http.post<User>(this.userUrl + "/update.do",user,httpOptions)
    .pipe(
      tap(_=> this.log(`update users with id = ${user.id}`)),
      catchError(this.handleError<any>(`updateUser`))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  private log(message: string){
    this.messageService.add(`UserService: ${message}`);
  }
}
