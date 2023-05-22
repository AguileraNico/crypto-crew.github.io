import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-new-proposal',
    templateUrl: './new-proposal.component.html',
    styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent {

    proposalDescription = new FormGroup({
        name: new FormControl('', [Validators.required]),
        shortDescription: new FormControl('', [Validators.required]),
        longDescription: new FormControl('', [Validators.required]),
    });
    proposalDetails = new FormGroup({
        amountNeeded: new FormControl(null, [Validators.required]),
        estimatedRevenue: new FormControl(null, [Validators.required]),
        deadline: new FormControl(null, [Validators.required])
    });
    proposalLocation = new FormGroup({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
    });

    submitProposal() {
        const proposal = {
            ...this.proposalDescription.value,
            ...this.proposalDetails.value,
            ...this.proposalLocation.value
        }
        console.log(proposal)
    }
}