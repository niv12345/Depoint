import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage:Storage,
              private plt:Platform) {

                this.plt.ready().then(()=>{
                  this.checkToken();
                })
               }

  public checkToken(){
                this.storage.get(TOKEN_KEY).then(res=>{
                    if(res){
                        this.authenticationState.next(true);
                    }
                })
               }

  public login(){
                  return this.storage.set(TOKEN_KEY,localStorage.getItem('AUTH_KEY')).then(()=>{
                    this.authenticationState.next(true);
                  })
                }

  public logout(){
                  return this.storage.remove(TOKEN_KEY).then(()=>{
                    this.authenticationState.next(false);
                  })
                }

  public isAuthenticated(){
                    return this.authenticationState.value;
                  }
}
