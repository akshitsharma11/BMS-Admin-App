import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feedbackFilterPipe'
})
export class FeedbackFilterPipePipe implements PipeTransform {

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
                    let newItem = JSON.stringify(item[k]);
                    console.log(newItem);
                    if (newItem != null && newItem != undefined )
                        return newItem.toLowerCase().includes(term.toLowerCase());
                }
            );
        });
    }
    return items;
  }

}
