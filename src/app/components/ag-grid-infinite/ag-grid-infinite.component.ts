import { Component, OnInit } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
  InfiniteRowModelModule,
  ModuleRegistry,
  RowModelType,
  SortModelItem,
  ValidationModule,
} from "ag-grid-community";

import { SetFilterModule } from "ag-grid-enterprise";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";

ModuleRegistry.registerModules([
  SetFilterModule,
  InfiniteRowModelModule,
  ValidationModule,
]);

@Component({
  selector: 'app-ag-grid-infinite',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './ag-grid-infinite.component.html',
  styleUrl: './ag-grid-infinite.component.scss'
})

export class AgGridInfiniteComponent implements OnInit {
  filterParams: any = {
    values: [
      "Lou Goossens",
      "Paige Tamada",
      "Christa Taylor Brown",
      "Miho Nomoto",
      "Yang Mi",
      "Fan Bingbing",
      "Robert Timothy Smith",
      "Sydney Sweeney",
      "Gary Oldman",
      "Gabriel Guevara",
      "Kiernan Shipka",
      "Jenna Ortega",
      "Toshiaki Karasawa",
      "Jason Statham",
      "Dyessa Garcia",
      "Ana de Armas",
      "Zhao Liying",
      "Nicole Wallace",
      "Tom Cruise",
      "Taron Egerton"
  ]
  };
  public columnDefs: ColDef[] = [
    {
      headerName: "ID",
      maxWidth: 100,
      valueGetter: "node.id",
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
        }
      },
    },
    { field: "adult", minWidth: 150 },
    { field: "gender" },
    { field: "known_for_department", minWidth: 150 },
    {
      field: "name",
      filter: "agSetColumnFilter",
      filterParams: this.filterParams,
    },
    { field: "original_name", minWidth: 150 },
    { field: "popularity", minWidth: 150 },
    {
      field: "profile_path", onCellClicked: (event: CellClickedEvent) => {
        this.route.navigate(['/profile', event.data.name.replace(' ', '')], { state: { object: event.data } });
      }
    },

  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: false,
  };
  public rowBuffer = 0;
  public rowModelType: RowModelType = "infinite";
  public cacheBlockSize = 2;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 1;
  public infiniteInitialRowCount = 5;
  public maxBlocksInCache = 2;
  public rowData!: any[];
  namesList: any = []; 

  constructor(private apiService: ApiService, private route: Router) { 

  }
  ngOnInit(): void {

  }

  onGridReady(params: GridReadyEvent<any>) {
    this.apiService.getDataWithHeaders("https://api.themoviedb.org/3/person/popular?language=en-US&page=1")
      .subscribe((res) => {
        console.log("column defs", this.columnDefs);
        let data = res.results;
        console.log(data, "data");
        data.forEach(function (d: any, index: number) {
          d.id =  (index + 1);
        });
        const dataSource: IDatasource = {
          rowCount: undefined,
          getRows: (params: IGetRowsParams) => {
            setTimeout(() => {
              const dataAfterSortingAndFiltering = sortAndFilter(
                data,
                params.sortModel,
                params.filterModel,
              );
              const rowsThisPage = dataAfterSortingAndFiltering.slice(
                params.startRow,
                params.endRow,
              );
              let lastRow = -1;
              if (dataAfterSortingAndFiltering.length <= params.endRow) {
                lastRow = dataAfterSortingAndFiltering.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api!.setGridOption("datasource", dataSource);
        this.apiService.getDataWithHeaders("https://api.themoviedb.org/3/person/popular?language=en-US&page=1")
        .subscribe((res: any) => {
          let data = res.results;
          for (let i = 0; i < data.length; i++) {
            this.namesList.push(data[i].name);
          }
          console.log("columdef", this.columnDefs, "nameslist", this.namesList);
          
          this.columnDefs[4].filterParams = {
    
          }
          }

        )
        
        }
      )
 
  }
}

function sortAndFilter(
  allOfTheData: any,
  sortModel: SortModelItem[],
  filterModel: any,
) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel: SortModelItem[], data: any[]) {
  const sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  const resultOfSort = data.slice();
  resultOfSort.sort(function (a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      const sortColModel = sortModel[k];
      const valueA = a[sortColModel.colId];
      const valueB = b[sortColModel.colId];
      if (valueA == valueB) {
        continue;
      }
      const sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}
function filterData(filterModel: any, data: any[]) {
  const filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  const resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (filterModel.name) {
      if (filterModel.name.values.indexOf(item.name.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.name) {
      if (filterModel.name.values.indexOf(item.name) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
}
