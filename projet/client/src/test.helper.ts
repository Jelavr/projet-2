import { defer, from, Observable } from "rxjs";

export class TestHelper {

    public static asyncData<T>(data: T): Observable<T> {
        return defer(() => from(Promise.resolve(data)));
    }
}
