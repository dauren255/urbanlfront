import {Status} from './status.model';
import {User} from './user.model';

export class Mover {
    id?: number;
    carName?: string;
    carData?: string;
    carNumber?: string;
    status?: Status;
    rating?: number;
    user?: User;
}
