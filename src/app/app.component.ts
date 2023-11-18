import { Component, OnInit } from '@angular/core';
import { first, fromEvent, map, of, scan, throttleTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'angular-101-day3';
  //private count = 0;

  // ngOnInit(): void {
  //   // This is a pure function. It doesnt depend on an external variable.
  //   // scan is inspired in Array.reduce -> scan all events and keeps a value.
  //   // Takes a value and returns that value with transformation.
  //   fromEvent(document, "click")
  //     .pipe(scan((count) => count + 1, 0))
  //     .subscribe((count) => console.log(`Clicked ${count}`));
  // }

  // pipe takes a list of params. throttle times -> purity + flow
  // throttleTime avoids observable emission during time in milliseconds.
  // map (Array) -> map (rxjs)
  // reduce (Array) -> scan (rxjs)
  ngOnInit(): void {
    fromEvent(document, "click")
      .pipe( // Transformaciones u observables de nivel superior.
        throttleTime(1000) ,
        map(   (event: any) => event.clientX   ) ,
        scan(   (count, clientX) => count + clientX, 0   )
      ).subscribe( (count) => console.log(`Clicked ${count} X`) );

      this.playWithObservables();
  }



  private playWithObservables = () => {

    const names = of('Ismael', 'L', 'Q');


    names.pipe( first() ).subscribe((value)=>{
      console.log('El primero es '+ value);
    });






  };
}
