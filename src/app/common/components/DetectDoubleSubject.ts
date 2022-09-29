import { Observable, PartialObserver, Subscription } from 'rxjs';

export class DetectDoubleSubject {
  private flag = false;
  private subject = new Observable(observer => {
    if (!this.flag) {
      this.flag = true;
    } else {
      this.flag = false;
      observer.next();
    }
  });
  private subscription: Subscription;

  subscribeTemporary = (observer: PartialObserver<void>, temporaryTime: number) => {
    this.subscription = this.subject.subscribe(observer);
    setTimeout(() => {
      this.flag = false;
      this.subscription.unsubscribe();
    }, temporaryTime);
  };
}
