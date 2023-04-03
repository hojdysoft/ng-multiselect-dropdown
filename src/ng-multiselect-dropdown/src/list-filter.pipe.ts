import { Pipe, PipeTransform } from '@angular/core';

import { ListItem } from './multiselect.model';

@Pipe({
  name: 'multiSelectFilter',
  pure: false
})
export class ListFilterPipe implements PipeTransform {
  transform(items: ListItem[], filter: ListItem, noDiacritic: boolean): ListItem[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: ListItem) => this.applyFilter(item, filter, noDiacritic));
  }

  applyFilter(item: ListItem, filter: ListItem, noDiacritic: boolean): boolean {
    if (typeof item.text === 'string' && typeof filter.text === 'string') {
      if (noDiacritic)
        return !(filter.text && item.text && this.removeDiacritics(item.text.toLowerCase()).indexOf(this.removeDiacritics(filter.text.toLowerCase())) === -1);
      else
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    } else {
      return !(filter.text && item.text && item.text.toString().toLowerCase().indexOf(filter.text.toString().toLowerCase()) === -1);
    }
  }

  removeDiacritics(val: string): string {
    if (!val) return val;
    return val.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }
}
