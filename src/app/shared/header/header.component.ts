import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Web3Service } from "src/app/web3/service/web3.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() isLogged: boolean = false;

  constructor(private web3: Web3Service, private router: Router) {}

  login() {
    this.web3.connect().subscribe((el) => {
      console.log(el)
      this.router.navigate(['/landing'])
    })
  }

}
