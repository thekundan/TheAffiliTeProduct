import { Injectable ,Pipe} from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitContService {

  constructor() {}
   transform(value: string, stringLimit: number): any {
     console.log(stringLimit);
     if(value.length > stringLimit) value = value.substring(0,stringLimit);
     return value;
   }
}
