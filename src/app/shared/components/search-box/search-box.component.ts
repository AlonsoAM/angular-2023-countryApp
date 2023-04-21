import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private _debouncer: Subject<string> = new Subject<string>();
  private _debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public inititalValue: string = '';

  @ViewChild('txtInput')
  public value!: ElementRef<HTMLInputElement>;

  @Output()
  public emitTerm: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this._debouncerSuscription = this._debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this._debouncerSuscription?.unsubscribe();
  }

  searchTerm(): void {
    const newTerm = this.value.nativeElement.value;
    this.emitTerm.emit(newTerm);
  }

  onKeyPress(searchTerm: string) {
    this._debouncer.next(searchTerm);
  }
}
