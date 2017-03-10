import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import Horizon from "@horizon/client";
import {HorizonInstance, Collection} from "./horizon.types";

@Injectable()
export class HorizonService {



  private horizon: HorizonInstance;

  get status() :Observable<any>{
    return this.horizon.status();
  }

  retrieve(): Observable<any> {
    return this.collection
            // .order(['datetime'], 'descending')
            // .limit(8)
            .fetch()

  }

  delete = (doc: any): Observable<any> => {
    return this.collection.remove(doc);
  }

  add = (doc: any): Observable<any> => {
    return this.collection.store(doc);
  }

  update = (doc: any): Observable<any> => {
    return this.collection.update(doc);
  }


  get collection():Collection{

    return this.horizon('myData');
  }

  constructor() {

    this.horizon = Horizon({
      host: '192.168.99.100:8181',
      lazyWrites: true
    });
    this.horizon.connect()
/*    this.horizon.onReady()
      .do( _ => {  })
      .do( connection => { console.log('connection', connection) })*/
  }
}



/*
cont doc = {
  text: text,
  datetime: new Date(),
  url: this.avatar_url,
}
*/
