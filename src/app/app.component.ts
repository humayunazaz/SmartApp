import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeoJson } from 'ngh-mapbox-gl';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'smartApp';
  constructor() {}

  ngOnInit(): void {

  }

}
