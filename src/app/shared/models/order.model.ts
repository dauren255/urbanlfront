import {Mover} from './mover.model';
import {Status} from './status.model';
import {User} from './user.model';
import {Photo} from './photo.model';
import {Location} from './location.model';

export class Order {
    id: number;
    mover?: Mover;
    user: User;
    startDate: Date;
    endDate?: Date;
    arrivalPlace: Location;
    destinationPlace: Location;
    status: Status;
    rating?: number;
    photo?: Photo[];
}
