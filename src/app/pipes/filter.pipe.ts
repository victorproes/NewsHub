import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  
  transform(items: any[], searchText: string, key: string = 'title'): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    console.log(searchText);
    

    return items.filter(item => {
      return item[key].toLowerCase().includes(searchText);
    });
  }
}
