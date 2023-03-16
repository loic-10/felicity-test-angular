import { Pipe, PipeTransform } from '@angular/core';
import { FilterUsers, User } from '../../../../interfaces';

@Pipe({
  name: 'usersFilter',
})
export class UsersFilterPipe implements PipeTransform {
  transform(users: User[] | null, filterUsers: FilterUsers): User[] {
    return users && users.length
      ? users.filter(
          ({ full_name, username }: User) =>
            full_name
              .toLowerCase()
              .includes(filterUsers.search.toLowerCase()) ||
            username.toLowerCase().includes(filterUsers.search.toLowerCase())
        )
      : [];
  }
}
