import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})


export class PlayerService {
 
  private url ='https://691476053746c71fe0484e7b.mockapi.io/players';
  constructor(private http: HttpClient) { }



  getAllPlayer(): Observable<Player[]>{
    return this.http.get<Player[]>(this.url);
}

  addPlayer(player: Player): Observable<Player>{
    return this.http.post<Player>(this.url, player);
  }

  updatePlayer(player: Player): Observable<Player>{
    const updateUrl = `${this.url}/${player.id}`;
    return this.http.put<Player>(updateUrl, player);
  }

  deletePlayer(id: number): Observable<void>{
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

}
