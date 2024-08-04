import { Component, OnInit } from "@angular/core";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    proposals: any[] = [
      {
        id: 1,
        name: 'Test',
        description: 'asdasd asd asd s fda sdasdas d as da sd a ds dsads da sd as d s'
      },
      {
        id: 2,
        name: 'Test',
        description: 'asdasd asd asd s fda sdasdas d as da sd a ds dsads da sd as d s'
      }
    ];
  
    constructor(private web3: Web3Service) {}
  
    ngOnInit(): void {
      this.web3.getProposals();
    }
  }