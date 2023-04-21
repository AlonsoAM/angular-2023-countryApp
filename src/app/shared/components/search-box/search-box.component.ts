import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { OnInit } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit {
  private _debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @ViewChild('txtInput')
  public value!: ElementRef<HTMLInputElement>;

  @Output()
  public emitTerm: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this._debouncer.pipe(debounceTime(300)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  searchTerm(): void {
    const newTerm = this.value.nativeElement.value;
    this.emitTerm.emit(newTerm);
  }

  onKeyPress(searchTerm: string) {
    this._debouncer.next(searchTerm);
  }
}
