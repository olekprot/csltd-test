import { CarEntity } from "./CarEntity";
import { OwnerEntity} from "./OwnerEntity";
import { Observable } from "rxjs";

export interface ICarOwnersService {
    getOwners(): Observable<OwnerEntity[]>;
    getOwnerById(id: number): Observable<OwnerEntity>;
    editOwner(owner: OwnerEntity): Observable<OwnerEntity>;
    deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
   }
   