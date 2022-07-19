import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any, term: any): any {
    //   console.log(items,term);
    if (term) {
        return items.filter(item => {
            return Object.keys(item).some(
                k => {
                    if(item[k]==undefined || item[k]==null)
                    {
                        item[k]="";
                    }
                    item[k] = item[k].toString();
                    if (item[k] != null && item[k] != undefined )
                        return item[k].toLowerCase().includes(term.toLowerCase());
                }
            );
        });
    }
    return items;
}

}
