import { Injectable } from "@angular/core";
import { BigNumber, ethers } from "ethers";
import { crowABI } from "../abi/crowfunding";
import {
  Observable,
  from,
  switchMap,
  tap,
  forkJoin,
  map,
  shareReplay,
} from "rxjs";
import { Web3MappersService } from "../utils/mappers.service";
import { ROLES } from "../constants/roles";

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  accounts!: string[];
  signer!: ethers.providers.JsonRpcSigner;
  crowContract!: ethers.Contract;
  proposals!: any[];
  provider!: ethers.providers.Web3Provider;
  address = "0x01b7D00193be70946810aB6065e372C2533eb5D9";

  constructor(private mapperService: Web3MappersService) { }

  async connect() {

    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);

    const accounts = await this.provider.send("eth_requestAccounts", [])
    this.accounts = accounts;
    this.signer = this.provider.getSigner();
    this.crowContract = new ethers.Contract(this.address, crowABI, this.signer);

  }

  async getProposals() {
    const prov = new ethers.providers.Web3Provider((window as any).ethereum);
    const acc = await this.provider.send("eth_requestAccounts", [])
    const sig = prov.getSigner();
    const crwContr = new ethers.Contract(this.address, crowABI, sig);
    const test = await crwContr['getTotalProposals']()
    console.log(test)
    const num = test.toNumber();
    console.log(num)
  }

  // getProposals() {
  //   if (!this.crowContract) {
  //     return this.connect().pipe(
  //       switchMap(() => {
  //         return from(this.crowContract["getTotalProposals"]() as Promise<BigNumber>)
  //       }
  //       ),
  //       switchMap((amount: BigNumber) => {
  //         const num = amount.toNumber();
  //         const proposalsObservables: Observable<any>[] = [];
  //         for (let index = 0; index < num && index < 10; index++) {
  //           proposalsObservables.push(
  //             from(this.crowContract["proposals"](index)).pipe(
  //               map((el: any) => ({
  //                 ...el,
  //                 id: index,
  //               }))
  //             )
  //           );
  //         }
  //         return forkJoin(proposalsObservables).pipe(
  //           map((data: any[]) =>
  //             data.map((el) => this.mapperService.mapProposals(el)).reverse()
  //           ),
  //           tap((proposals) => (this.proposals = proposals))
  //         );
  //       })
  //     );
  //   } else {
  //     return from(
  //       this.crowContract["getTotalProposals"]() as Promise<BigNumber>
  //     ).pipe(
  //       switchMap((amount: BigNumber) => {
  //         const num = amount.toNumber();
  //         const proposalsObservables: Observable<any>[] = [];
  //         for (let index = 0; index < num && index < 10; index++) {
  //           proposalsObservables.push(
  //             from(this.crowContract["proposals"](index)).pipe(
  //               map((el: any) => ({
  //                 ...el,
  //                 id: index,
  //               }))
  //             )
  //           );
  //         }
  //         return forkJoin(proposalsObservables).pipe(
  //           map((data: any[]) =>
  //             data.map((el) => this.mapperService.mapProposals(el)).reverse()
  //           ),
  //           tap((proposals) => (this.proposals = proposals))
  //         );
  //       })
  //     );
  //   }
  // }

  getProposal(id: number) {
    if (!this.crowContract) {
      return from(this.connect()).pipe(
        switchMap(() => from(this.crowContract["proposals"](id))),
        map((el) => this.mapperService.mapProposals(el))
      );
    }
    return from(this.crowContract["proposals"](id)).pipe(
      map((el) => this.mapperService.mapProposals(el))
    );
  }

  contribute(id: number, amount: number) {
    // const wallet = new ethers.Wallet(this.signer)
    const contractWithSigner = this.crowContract.connect(this.signer);
    return from(
      contractWithSigner["contribute"](id, {
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: 500000,
      })
    );
  }

  isBuilder() {
    if (!this.crowContract) {
      return from(this.connect()).pipe(
        switchMap(() => this.signer.getAddress()),
        switchMap((address) =>
          this.crowContract["hasRole"](ROLES.BUILDER, address)
        )
      );
    } else {
      return from(this.signer.getAddress()).pipe(
        switchMap((address) =>
          this.crowContract["hasRole"](ROLES.BUILDER, address)
        )
      );
    }
  }

  newProposal(form: any) {

  }
}
