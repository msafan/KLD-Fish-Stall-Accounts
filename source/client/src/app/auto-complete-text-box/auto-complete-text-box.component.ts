import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-text-box',
  templateUrl: './auto-complete-text-box.component.html',
  styleUrls: ['./auto-complete-text-box.component.css']
})
export class AutoCompleteTextBoxComponent implements OnInit {
  @Input() value: string;
  @Input() suggestions: Array<string> = new Array<string>();
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.suggestions.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  onChanged() {
    this.changed.emit(this.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
