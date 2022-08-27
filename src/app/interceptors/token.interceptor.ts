import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     //check if if request to server
     if(request.url.includes(environment.server)){
      return from(this.auth.getToken()).pipe(
        switchMap((token:string)=>{
          if(token){
            const headers = request.headers.set('Authorization',token);
            const req = request.clone({
              headers
            })
            return next.handle(req);
          }
          else{
            return next.handle(request);
          }
          
          
        })
      )
    }

    return next.handle(request);
  }
}
