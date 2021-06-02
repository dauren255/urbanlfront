import {UserRole} from './user.role.model';
import {Company} from './company.model';

export class User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    roles: UserRole[];
    phoneNumber: string;
    token: string;
    company: Company;
}
