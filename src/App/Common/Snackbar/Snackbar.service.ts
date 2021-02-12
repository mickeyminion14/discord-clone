import { Subject } from "rxjs";

const snackBarSubject = new Subject<any>();

class SnackBarService {
  openSnackbar = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "success"
  ) => snackBarSubject.next({ message: message, type: type });

  /**
   * @description dont use it in tsx use it only in service
   */
  getSnackBarSubject = () => snackBarSubject.asObservable();
}
export const snackBarService = new SnackBarService();
