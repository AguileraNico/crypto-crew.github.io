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

  constructor(private mapperService: Web3MappersService) {}

  connect(): Observable<any> {
    const address = "0x88739Fc56b48948f5413752fE25aC312707e5B92";

    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);

    return from(this.provider.send("eth_requestAccounts", [])).pipe(
      tap((accounts) => {
        this.accounts = accounts;
        this.signer = this.provider.getSigner();
        this.crowContract = new ethers.Contract(address, crowABI, this.signer);
      }),
      shareReplay()
      // switchMap(() => from(this.crowContract['proposals'](1)))
    );
    // ).subscribe(proposals => this.proposal = proposals);
  }

  getProposals() {
    if (!this.crowContract) {
      return this.connect().pipe(
        switchMap(() =>
          from(this.crowContract["getTotalProposals"]() as Promise<BigNumber>)
        ),
        switchMap((amount: BigNumber) => {
          const num = amount.toNumber();
          const proposalsObservables: Observable<any>[] = [];
          for (let index = 0; index < num || index < 10; index++) {
            proposalsObservables.push(
              from(this.crowContract["proposals"](index)).pipe(
                map((el: any) => ({
                  ...el,
                  id: index,
                }))
              )
            );
          }
          return forkJoin(proposalsObservables).pipe(
            map((data: any[]) =>
              data.map((el) => this.mapperService.mapProposals(el)).reverse()
            ),
            tap((proposals) => (this.proposals = proposals))
          );
        })
      );
    } else {
      return from(
        this.crowContract["getTotalProposals"]() as Promise<BigNumber>
      ).pipe(
        switchMap((amount: BigNumber) => {
          const num = amount.toNumber();
          const proposalsObservables: Observable<any>[] = [];
          for (let index = 0; index < num || index < 10; index++) {
            proposalsObservables.push(
              from(this.crowContract["proposals"](index)).pipe(
                map((el: any) => ({
                  ...el,
                  id: index,
                }))
              )
            );
          }
          return forkJoin(proposalsObservables).pipe(
            map((data: any[]) =>
              data.map((el) => this.mapperService.mapProposals(el)).reverse()
            ),
            tap((proposals) => (this.proposals = proposals))
          );
        })
      );
    }
  }

  getProposal(id: number) {
    if (!this.crowContract) {
      return this.connect().pipe(
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
      return this.connect().pipe(
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
}
