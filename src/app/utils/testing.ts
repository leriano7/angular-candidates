import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from '@angular/platform-browser';


export function findEl<T>(fixture: ComponentFixture<T>, testId: string) : DebugElement {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function click<T> (fixture: ComponentFixture<T>, testId: string) {
    const element = findEl(fixture, testId);
    const event = makeMouseEvent(element.nativeElement, "click");
    element.triggerEventHandler("click", event);
}

export function mouseEnter<T> (fixture: ComponentFixture<T>, testId: string) {
    const element = findEl(fixture, testId);
    const event = makeMouseEvent(element.nativeElement, "mouseenter");
    element.triggerEventHandler("mouseenter", event);
}

export function mouseLeave<T> (fixture: ComponentFixture<T>, testId: string) {
    const element = findEl(fixture, testId);
    const event = makeMouseEvent(element.nativeElement, "mouseleave");
    element.triggerEventHandler("mouseleave", event);
}

export function makeMouseEvent(target: EventTarget, type: string) {
    return {
        preventDefault() : void{},
        stopPropagation() {},
        stopImmediatePropagation() {},
        type : type,
        target,
        currentTarget: target,
        bubbles: true,
        cancelable: true,
        button: 0
    };
}

export function expectText<T>(
    fixture: ComponentFixture<T>,
    testId: string,
    text: string
  ): void {
    const element = findEl(fixture, testId);
    const actualText = element.nativeElement.textContent;
    expect(actualText).toBe(text);
  }
  
