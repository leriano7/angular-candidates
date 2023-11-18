import { Component, OnInit } from '@angular/core';
import { fromEvent, scan } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'angular-101-day3';
  //private count = 0;

  ngOnInit(): void {

    document.addEventListener("click",()=>{
      // This is a pure function. It doesnt depend on an external variable.
      // scan is inspired in Array.reduce -> scan all events and keeps a value.
      // Takes a value and returns that value with transformation.
      fromEvent(document, "click")
        .pipe( scan(   (count)=> count + 1 , 0  ) )
        .subscribe(   (count) => console.log(`Clicked ${count}`)   );
    });
  }
}
