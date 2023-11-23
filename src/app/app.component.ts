import { Component, OnInit } from '@angular/core';
import { first, fromEvent, of, map, scan, throttleTime, take, last, filter, mergeMap, interval, switchMap, timer, takeUntil, Subscription } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {}

  public title = 'angular-101-day3';
  public isLoggedIn! : Boolean;

  private subscription : Subscription | null = null;

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLogged();
  }

  public logoutClass = () => {
    // Object notation
    return {
      "hidden-link" : !this.isLoggedIn
    }
  };

  public subscribeToLoginEvent(componentRef: any) {
    if(componentRef instanceof LoginComponent) {
      this.subscription = (componentRef as LoginComponent)
          .loginEvent.subscribe(()=> {
            this.isLoggedIn = this.userService.isLogged();
          });
    }
  }

  public unsubscribeFromLoginEvent() {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  public logout = () => {
    this.userService.logout();
    this.isLoggedIn = this.userService.isLogged();
  }

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
  /*
  ngOnInit(): void {}
    /*
    fromEvent(document, "click")
      .pipe( // Transformations or high order observables
        throttleTime(1000),
        map((event: any) => event.clientX),
        scan((count, clientX) => count + clientX, 0)
      ).subscribe((count) => console.log(`Clicked ${count} X`));
    */
    //this.playWithObservables();
  //}
  //

  /*
  private playWithObservables = () => {
    const names = of('Ismael', 'L', 'Q');

    names.pipe(first()).subscribe((value) => {
      console.log('El primero es ' + value);
    });

    names.pipe(take(2)).subscribe((value) => {
      console.log('Take ' + value);
    });

    names.pipe(last()).subscribe((value) => {
      console.log('El último es ' + value);
    });

    names.pipe(filter((value: string) => value.startsWith('Q'))).subscribe((value) => {
      console.log('Empieza por Q ' + value);
    });
    /* --- Expected execution ---
      El primero es Ismael
      Take Ismael
      Take L
      El último es Q
      Empieza por Q Q
    */
   /*
    // const letters = of('a', 'b', 'c');
    // letters.pipe(
    //   mergeMap(x => interval(1000).pipe(map(i => x + i))) // takes a , b , c
    //   // switchMap(x => interval(1000).pipe(map(i => x + i))) // Only takes c
    // ).subscribe(value => console.log('El valor es '+ value));

    // emit value every 1s
    const source = interval(1000);
    // after 5 seconds, emit value
    const timer$ = timer(5000);
    // when timer emits after 5s, complete source
    const example = source.pipe(takeUntil(timer$));
    // output: 0,1,2,3
    example.subscribe(val => console.log(val));
  };
  */
}
