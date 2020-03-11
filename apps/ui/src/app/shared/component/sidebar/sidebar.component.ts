import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerActions, PlayerFacade } from '../../../player/+state';
import { Observable } from 'rxjs';
import { Player } from '@f2020/data';

@Component({
  selector: 'f2020-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  player$: Observable<Player>;

  constructor(private playerFacade: PlayerFacade) { }

  ngOnInit(): void {
    this.player$ = this.playerFacade.player$;
  }

  signOut() {
    this.playerFacade.dispatch(PlayerActions.logoutPlayer());
  }
}
