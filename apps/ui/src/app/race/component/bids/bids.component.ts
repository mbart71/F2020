import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bid } from '@f2020/data';

@Component({
  selector: 'f2020-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class BidsComponent {

  @Input() bids: Bid[];

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  gotoBid(uid: string) {
    console.log(uid);
    this.router.navigate(['bid', uid], {relativeTo: this.route})
    
  }
}
