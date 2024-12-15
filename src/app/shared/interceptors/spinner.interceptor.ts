import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core"
import { SpinnerService } from "@shared/components/spinner/spinner.service"
import { finalize } from "rxjs";

export const SpinnerInterceptor: HttpInterceptorFn  = (req, next)=>{
  const spinnerSvc = inject(SpinnerService);
  spinnerSvc.show();

  return next(req).pipe(
    finalize(()=>{
      setTimeout(() => {
        spinnerSvc.hide()
      }, 1000);
    })
  )
}
