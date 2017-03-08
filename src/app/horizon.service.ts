
import { Observable } from 'rxjs/Observable';
import {Horizon, HorizonInstance, Collection}  from '@horizon/client';





export class HorizonService {

  horizon: HorizonInstance;
  collection: Collection;
  avatar_url = `http://api.adorable.io/avatars/50/${new Date().getMilliseconds()}.png`;

  constructor() {
    this.horizon = Horizon({host: '192.168.99.100:8181'});

    this.collection = this.horizon('myData');
  }
  getData(): Observable<any> {
    return this.collection.watch()
    // .order(['datetime'], 'descending')
      // .limit(8)

  }

   sendData(doc: any): Observable<any> {
    return this.collection.store(doc);
  }
}


/*
cont doc = {
  text: text,
  datetime: new Date(),
  url: this.avatar_url,
}
*/
