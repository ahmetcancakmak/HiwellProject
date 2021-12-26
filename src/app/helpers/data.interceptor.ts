import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {User} from "../models/user";
import {Role} from "../models/role";

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: User[] = [
      { id: 1, username: 'psy', password: '123', name: 'TestPsyName' , surname: 'TestPsySurame' ,role: Role.Psychologist },
      { id: 2, username: 'client', password: '123', name: 'TestClientName' , surname: 'TestClientSurame' , role: Role.Client },
    ];

    let savedDatas: User[] = [
      {
        id : 1 ,
        username: 'Aclient',
        password: '123',
        name: 'ATestClientName',
        surname : 'ATestClientSurname',
        role: Role.Client ,
        appointment:{
            psyName:"psy", date: new Date("123") , subject: 'asdasdsdasad', description:'asdsasadsa', status: true
          }
      },
      {
        id : 2 ,
        username: 'Bclient2',
        password: '123',
        name: 'BTestClientName',
        surname : 'BTestClientSurname',
        role: Role.Client ,
        appointment:{
          psyName:"psy", date: new Date("123") , subject: 'asdasdsdasad', description:'asdsasadsa', status: true
        }
      },
      {
        id : 3 ,
        username: 'Cclient',
        password: '123',
        name: 'CTestClientName',
        surname : 'CTestClientSurname',
        role: Role.Client ,
        appointment:{
          psyName:"psy", date: new Date("123") , subject: 'asdasdsdasad', description:'asdsasadsa', status: true
        }
      },
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader!.split('.')[1];
    const role = roleString;

    return of(null).pipe(mergeMap(() => {

      if (request.url.endsWith('/auth') && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
        if (!user) return error('Username or password is incorrect');
        return ok({
          id: user.id,
          username: user.username,
          role: user.role,
          token: `fake-jwt-token.${user.role}`
        });
      }

      if (request.url.endsWith('/setData') && request.method === 'POST') {
        savedDatas = request.body;
        return ok("Success");
      }

      if (request.url.endsWith('/getData') && request.method === 'GET') {
        return ok(savedDatas);
      }

      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        if (!isLoggedIn) return unauthorised();

        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        const currentUser = users.find(x => x.role === role);
        if (id !== currentUser!.id && role !== Role.Psychologist) return unauthorised();

        const user = users.find(x => x.id === id);
        return ok(user);
      }

      if (request.url.endsWith('/users') && request.method === 'GET') {
        return ok(users);
      }

      if (request.url.endsWith('/psy') && request.method === 'GET') {
        const psychologists = users.filter(x => x.role === Role.Psychologist);
        return ok(psychologists);
      }

      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function ok(body:any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message:any) {
      return throwError({ status: 400, error: { message } });
    }
  }

}

export let dataProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DataInterceptor,
  multi: true
};
