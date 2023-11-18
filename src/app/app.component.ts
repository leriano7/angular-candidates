import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'angular-101-day3';
  private count = 0;

  ngOnInit(): void {
    //fromEvent(document, "click").subscribe(()=>console.log('Clicked!'));
    document.addEventListener("click",()=>{
      // This is not a pure function. It depends on an external variable
      // console.log("Clicked " + this.count++);
      console.log(`Clicked ${this.count++}`);
    });
  }

}
