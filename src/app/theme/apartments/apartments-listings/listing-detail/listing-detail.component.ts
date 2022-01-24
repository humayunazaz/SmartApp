import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFeatureRecord } from '../../models/listings';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss']
})
export class ListingDetailComponent implements OnInit {
  @Input() listings: IFeatureRecord[] = [];
  @Output() selectedListing: EventEmitter<IFeatureRecord> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectListing(listing: IFeatureRecord): void {
    this.selectedListing.emit(listing);
  }

}
