import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-shared-link-back-to-page',
  templateUrl: './back-to-page.component.html',
  styleUrls: ['./back-to-page.component.scss']
})
export class SharedLinkBackToPageComponent implements OnInit {

  @Input() description: string = '';
  @Input() destinationPath: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  async goToDestination() {
    await this.router.navigate(['admin/list']);
  }

}
