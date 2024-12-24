import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AgGridAngular } from "ag-grid-angular";
import { Router, RouterModule } from "@angular/router";
import { AgGridInfiniteComponent } from "./components/ag-grid-infinite/ag-grid-infinite.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [AgGridAngular, RouterModule, AgGridInfiniteComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title: string = "Movie Data App";
  ngOnInit(): void {
    localStorage.setItem("list", JSON.stringify(["newItem", "newItem2"]));
  }
}