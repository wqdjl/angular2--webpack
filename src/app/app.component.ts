import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl:  './app.component.html',
    //template:``
    //styles:['.red { color:red }','.blue { color:blue }']
    //styleUrls:['./app.component.css']
    //providers:[]
})
export class AppComponent {
    constructor() {
        console.log("process.env:"+process.env);
    };
    
    

    // ngDoCheck() {
    //     console.log("ngDoCheck-detail");
    // };
    // ngAfterContentInit() {
    //     console.log("ngAfterContentInit-detail");
    // }

    // ngAfterContentChecked() {
    //     console.log("ngAgterContentChecked-detail");
    // }
    // ngAfterViewInit() {
    //     console.log("ngAfterViewInit-detail");
    // }
    // ngAfterViewChecked() {
    //     console.log("ngAgterViewChecked-detail");
    // }
    // ngOnDestroy() {
    //     alert("OnDestroy");
    //     console.log("OnDestroy-detail");
    // }
    // // ngOnChanges() {
    // //     console.log("ngOnChanges-detail");
    // // }
}