import { Pipe, PipeTransform } from '@angular/core';
import { FilterServices, Service } from '../../../../interfaces';

@Pipe({
  name: 'servicesFilter',
})
export class ServicesFilterPipe implements PipeTransform {
  transform(
    services: Service[] | null,
    filterServices: FilterServices
  ): Service[] {
    return services && services.length
      ? services.filter(
          ({ name, description }: Service) =>
            description
              .toLowerCase()
              .includes(filterServices.search.toLowerCase()) ||
            name.toLowerCase().includes(filterServices.search.toLowerCase())
        )
      : [];
  }
}
