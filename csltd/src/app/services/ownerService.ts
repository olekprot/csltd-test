import { OwnerEntity } from '../model/OwnerEntity';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICarOwnersService } from '../model/ICarOwnerService';


@Injectable({ providedIn: 'root' })
export class OwnerService implements ICarOwnersService{

  private ownersUrl = 'api/owners';
  private http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor(http: HttpClient){
      this.http = http;
    }

    public getOwners(): Observable<OwnerEntity[]> {
      return this.http.get<OwnerEntity[]>(this.ownersUrl);
    }
    public getOwnerById(id: number): Observable<OwnerEntity> {
      const url = `${this.ownersUrl}/${id}`;
      return this.http.get<OwnerEntity>(url);
    }
    public editOwner (owner: OwnerEntity): Observable<any> {
      return this.http.put(this.ownersUrl, owner, this.httpOptions);
    }
    public deleteOwner (id: number): Observable<OwnerEntity[]> {
      return this.http.delete<OwnerEntity[]>(`${this.ownersUrl}/${id}`);
    }
  }       
            


