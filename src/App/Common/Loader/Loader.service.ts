import { Subject } from "rxjs";

const loaderSubject: Subject<any> = new Subject();
class LoaderService {
  getLoaderSubject = () => {
    return loaderSubject.asObservable();
  };

  showLoader = (state: boolean) => {
    loaderSubject.next(state);
  };
}

export const loaderService = new LoaderService();
