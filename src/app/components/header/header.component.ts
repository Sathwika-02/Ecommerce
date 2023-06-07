import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import fetch from 'node-fetch';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mycontrol=new FormControl('');
  productTitles:string[] = [];
  options:string[]=[];
  filteredOptions:Observable<String[]> | undefined;
   public searchTerm:string='';
   totalItemNumber:number=0;
   constructor(private cartservice:CartService,private http:HttpClient){}
   fetchData(): void {
    this.http.get<any[]>('http://localhost:3000/productList')
      .subscribe(
        data => {
          const titles = data.map(item => item.title);
          this.options.push(...titles);
          console.log(this.options);
        },
        error => {
          console.error('Error:', error);
        }
      );
  }
  
   ngOnInit():void{
     this.cartservice.getProducts().subscribe(res=>{
      this.totalItemNumber=res.length;
      this.filteredOptions = this.mycontrol.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
     })
   }

   private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter(street => this._normalizeValue(street).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartservice.search.next(this.searchTerm);
   }
  
 
  

   


 
}
