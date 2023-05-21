import { Component, OnInit } from '@angular/core';
import { Web3Service } from './web3/service/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crew';
  balance!: string;

  constructor(private web3: Web3Service) {
  }
  ngOnInit(): void {
    this.web3.connect();
  }
}
