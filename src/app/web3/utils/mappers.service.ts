import { Injectable } from "@angular/core";
import { BigNumber, ethers } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class Web3MappersService {

  mapProposals(proposal: any) {
    const d = new Date((proposal.deadline as BigNumber).toNumber() * 1000);
    return {
      id: proposal.id,
      // active: Date.now() < (d.toLocaleString() / 1000),
      deadline: new Date(d),
      description: proposal.description,
      funded: proposal.funded,
      name: proposal.name,
      received: ethers.utils.formatEther(proposal.received as BigNumber),
      value: ethers.utils.formatEther(proposal.value as BigNumber)
    }
  }
}
