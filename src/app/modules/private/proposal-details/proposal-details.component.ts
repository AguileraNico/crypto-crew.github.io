import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
  selector: 'app-proposal-component',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.scss']
})
export class ProposalDetailsComponent implements OnInit {

  proposal: any = {
    name: 'Test Project',
    description: 'test set se e etsetset  seesfe  et sdfgsrgggr sdfsdfs',
    value: 3000,
    received: 1500
  };
  form = new FormControl();
  id: number;

  constructor(private web3: Web3Service, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params["id"] as number;
  }

  ngOnInit(): void {
    // this.web3.getProposal(this.id).subscribe(data => this.proposal = data)
  }

  clearInput() {
    this.form.setValue(null);
  }

  applyContribution() {
    this.web3.contribute(this.id, this.form.value).subscribe(console.log)
  }

  goBack() {
    this.router.navigate(['../proposals'], { relativeTo: this.route});
  }
}
