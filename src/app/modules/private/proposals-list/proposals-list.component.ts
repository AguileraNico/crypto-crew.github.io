import { Component } from "@angular/core";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.scss']
})
export class ProposalsListComponent {

  isBuilder;

  constructor(private web3: Web3Service) {
    this.isBuilder = this.web3.isBuilder()
  }
}
