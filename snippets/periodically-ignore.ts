import type {Observable, OperatorFunction} from 'rxjs';
import {
  combineLatestWith,
  filter,
  interval,
  map,
  pipe,
  startWith,
  switchMap,
  take,
} from 'rxjs';

const source$ = interval(100);

const tick$ = interval(1000);

source$
  .pipe(periodicallyIgnore(tick$, 500))
  .subscribe(value => console.info(value));

/**
 * Periodically ignore values from source observable if `tick$` emits not
 * earlier than `timeout` milliseconds ago.
 */
function periodicallyIgnore<T>(
  tick$: Observable<unknown>,
  timeout: number,
): OperatorFunction<T, T> {
  return pipe(
    combineLatestWith(
      tick$.pipe(
        switchMap(() =>
          interval(timeout).pipe(
            take(1),
            map(() => false),
            startWith(true),
          ),
        ),
        startWith(false),
      ),
    ),
    filter(([, ignored]) => !ignored),
    map(([value]) => value),
  );
}
