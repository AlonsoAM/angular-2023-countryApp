import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('txtInput')
  public value!: ElementRef<HTMLInputElement>;

  @Output()
  public emitTerm: EventEmitter<string> = new EventEmitter();

  searchTerm(): void {
    const newTerm = this.value.nativeElement.value;
    this.emitTerm.emit(newTerm);
    // console.log(newTerm);
  }
}
