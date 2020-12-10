import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'readDataFromCSV';
  public tableData: any;
  constructor() {
    this.tableData;
  }
  ngOnInit() {
    console.log('WelCome');

  }

  readFile(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    let response;
    reader.onload = () => { // Called after file Reading operation completes
      response = reader.result;
    };
    reader.onloadend = () => {
      this.tableData = this.CSVtoArray(response);
      console.log(this.tableData);
      
    }
    

    reader.onerror = function() { // Error in reading operation
      console.log(reader.error);
    };
  
  }

  CSVtoArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};
}
