import { BehaviorSubject, Subject } from 'rxjs';
import { AppUtils } from '../utils';
import { tap } from 'rxjs/operators';

export class SubjectFactory<T> {
    public value = null;
    protected subject: Subject<T> = null;
    constructor(defaultValue: T = null) {
        if (AppUtils.isNullorUndefined(defaultValue)) {
            this.subject = new Subject<T>();
        } else {
            this.subject = new BehaviorSubject<T>(defaultValue);
            this.value = defaultValue;
        }
        this.listen().pipe(tap(data => {
            this.value = data;
        }));
    }

    public listen() {
        return this.subject.asObservable();
    }

    public notify(value: T) {
        this.subject.next(value as any);
    }

    public dispose() {
        this.subject.next();
        this.subject.complete();
    }

}
