import { Component, OnInit } from "@angular/core";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    proposals!: any[];
  
    constructor(private web3: Web3Service) {}
  
    ngOnInit(): void {
      this.web3.getProposals().subscribe(data => this.proposals = data);
    }
  }