import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IPFSService } from "src/app/web3/service/ipfs.service";

@Component({
    selector: 'app-new-proposal',
    templateUrl: './new-proposal.component.html',
    styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent implements OnInit {

    proposalDescription = new FormGroup({
        name: new FormControl('', [Validators.required]),
        shortDescription: new FormControl('', [Validators.required]),
        longDescription: new FormControl('', [Validators.required]),
    });
    proposalDetails = new FormGroup({
        value: new FormControl(null, [Validators.required]),
        estimatedRevenue: new FormControl(null, [Validators.required]),
        deadline: new FormControl(null, [Validators.required])
    });
    proposalLocation = new FormGroup({
        country: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
    });

    constructor(private ipfsService: IPFSService, private location: Location) {}

    ngOnInit(): void {
        // this.uploadFile()
    }

    submitProposal() {
        const proposal = {
            ...this.proposalDescription.value,
            ...this.proposalDetails.value,
            ...this.proposalLocation.value
        }
        console.log(proposal)
    }

    uploadFile() {
        const file = new File(['asdasd'], 'test.txt', {type: 'text/plain'});
        const formData = new FormData();
        formData.append('file', file);
        this.ipfsService.postFile(formData).subscribe(console.log)
    }

    goBack() {
        this.location.back();
    }
}