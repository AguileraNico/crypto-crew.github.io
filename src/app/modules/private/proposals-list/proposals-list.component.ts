import { Component, OnInit } from "@angular/core";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.scss']
})
export class ProposalsListComponent implements OnInit{

  proposals!: any[];

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    this.web3.getProposals().subscribe(data => this.proposals = data)
  }
}
