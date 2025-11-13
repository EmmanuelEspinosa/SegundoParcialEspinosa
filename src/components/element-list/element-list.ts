import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PlayerService } from '../../services/player-service';
import { Player } from '../../models/player';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-element-list',
  imports: [FormsModule],
  templateUrl: './element-list.html',
  styleUrl: './element-list.css'
})

export class ElementList implements OnInit {
  players: Player[] = [];
  newPlayer: Player = { id: 0, name: "", age: 0, team: "", goals: 0 };
  actualPlayer: Player = { id: 0, name: "", age: 0, team: "", goals: 0 };
  actualIndexPlayer: number = -1;
  filter: string = '';


  @ViewChild('modalElement') modalElement!: ElementRef;
  constructor(private apiService: PlayerService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadElements();
  }


  loadElements(): void {
    try {
      this.apiService.getAllPlayer().subscribe({
        next: (data: Player[]) => {
          this.players = data;
        },
        error: (err) => {
          alert('Error al obtener los posts: ' + err);
          this.players = [];
        }
      });
    }
    catch (error) {
      alert("ERROR" + error);
    }
  }

  savePlayer() {

    if (!this.newPlayer.name || this.newPlayer.age == null || !this.newPlayer.team || this.newPlayer.goals == null) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return;
    }
    if (this.newPlayer.age < 18) {
      alert('El jugador debe ser mayor de edad.');
      return;
    }

    this.apiService.addPlayer(this.newPlayer).subscribe({
      next: (createdPlayer) => {
        this.players.push(createdPlayer);
        this.resetFormPlayer();
      },
      error: (err) => {
        console.error('Error al guardar :', err);
        alert('No se pudo guardar.');
      }


    });
  }


  updateElement(): void {

    if (!this.actualPlayer.name || this.actualPlayer.age == null || !this.actualPlayer.team || this.actualPlayer.goals == null) {
      alert('Por favor, complete todos los campos antes de actualizar.');
      return;
    }
    if (this.actualPlayer.age < 18) {
      alert('El jugador debe ser mayor de edad.')
      return;

    }

    if (confirm("¿Estas seguro de actualizar a este jugador?")) {

      try {
        this.apiService.updatePlayer(this.actualPlayer).subscribe({
          next: (updatedPlayer) => {
            this.players[this.actualIndexPlayer] = updatedPlayer;
            this.closeModal();
          },
          error: (err) => {
            alert('Error al actualizar el jugador: ' + err);
          }
        })
      }
      catch (error) {
        console.error("ERROR", error)
      }

    }
  }


  deleteElement(id: number): void {
    if (confirm("¿Estas seguro de eliminar a este jugador?")) {

      try {
        this.apiService.deletePlayer(id).subscribe(() => {
          this.players = this.players.filter((player) => player.id !== id);
        });
      }
      catch (error) {
        console.error("ERROR", error)
      }

    }
  }


  showModal(player: Player): void {

    this.actualPlayer = { ...player };
    this.actualIndexPlayer = this.players.indexOf(player);
    this.renderer.setStyle(this.modalElement.nativeElement, 'display', 'flex');
  }

  closeModal() {
    this.renderer.setStyle(this.modalElement.nativeElement, 'display', 'none');
  }


  resetFormPlayer(): void {
    this.newPlayer = { id: 0, name: "", age: 0, team: "", goals: 0 };
  }


  get filterPlayer() {
    if (!this.filter.trim()) return this.players;
    const text = this.filter.toLowerCase();
    return this.players.filter(p =>
      p.name.toLowerCase().includes(text) ||
      p.team?.toLowerCase().includes(text)
    );
  }















}


