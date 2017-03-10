import {Component, OnDestroy, ChangeDetectionStrategy} from "@angular/core";
import {HorizonService} from "./horizon.service";
import {TermBase} from "./horizon.types";
import {Subscription, Observable, Subject, BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-root',
  template: `
  <h1>Greetings</h1>
  <h2>Status: <code>{{hz.status | async | json}}</code></h2>
  <button (click)="filter()">Toggle Filter</button> 

  <button (click)="add($event)">create</button>

  <ul>
    <li *ngFor="let document of retriever | async | async">
      <button (click)="delete(document)">×</button> <br />
      <pre (click)="update(document)"> {{document | json}}</pre>
    </li>
  </ul>


<!--  <router-outlet></router-outlet>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: []
})
export class AppComponent implements OnDestroy {
  retriever: Observable<any>;
  upstream: Subscription;
  filters = new BehaviorSubject(null)
  writeActions: Subject<any> = new Subject<any>();

  readonly avatar_url: string = `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;

  constructor(public hz: HorizonService){

    this.retriever =  this.filters
                          .map(filt => {
                            let coll: TermBase =  this.hz.collection;
                            if (filt) {
                              coll = coll.findAll(filt)
                            }

                            return coll.watch().do( result => { console.log('result', result) })

                          })


    this.upstream = this.writeActions
                      .switchMap( action => action.performer(action.payload) )
                      .subscribe()


  }


  filter(){
    if(this.filters.getValue()) {
      this.filters.next(null)
    }else{
      this.filters.next({text: "Saluton"})
    }
  }

  delete(document: any){
    const action = {
      type: "DELETE",
      performer: this.hz.delete,
      payload: document
    }
    this.writeActions.next(action)

  }

  update(document: any){
    const action = {
      type: "UPDATE",
      performer: this.hz.update,
      payload: Object.assign(document, {text: "Saluton"})
    }
    this.writeActions.next(action)

  }
  add(event:Event){

    const action = {
      type: "ADD",
      performer: this.hz.add,
      payload: {
        text: "World",
        event: event.type,
        //datetime: new Date(),
        url: this.avatar_url,
      }
    }
    this.writeActions.next(action)

  }

  ngOnDestroy(){
    this.upstream.unsubscribe();
  }


}
