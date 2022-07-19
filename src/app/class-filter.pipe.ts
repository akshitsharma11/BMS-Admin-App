import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classFilter'
})
export class ClassFilterPipe implements PipeTransform {

 transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(data){
        return JSON.stringify(data.title).toLowerCase().includes(args);
    });
  }

}
