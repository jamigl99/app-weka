import { Pipe, PipeTransform } from '@angular/core';
import { InstanceI } from 'src/app/modelos/Instance.interface';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(instances: InstanceI[], searchValue: string): InstanceI[] {
    if(!instances || !searchValue){
      return instances;
    }
    return instances.filter( instance =>
      instance.cluster.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
