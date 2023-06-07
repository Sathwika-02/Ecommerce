import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'Interfaces/Product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  imageObject = [
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/7fd0e4ab26429926.jpg?q=50",
      thumbImage:
        "https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/7fd0e4ab26429926.jpg?q=50"
    },
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/1866ae4778f23fbb.jpg?q=50",
      thumbImage:
        "https://rukminim1.flixcart.com/fk-p-flap/844/140/image/1866ae4778f23fbb.jpg?q=50"
    },
    {
      image:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kitchen_web17may-7c96f.jpg",
      thumbImage:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kitchen_web17may-7c96f.jpg",
    
    },
    {
      image:
        "hhttps://n1.sdlcdn.com/imgs/k/o/m/903_282_Kurta_Sets_17may-5fdef.jpg",
      thumbImage:
        "https://n1.sdlcdn.com/imgs/k/o/m/903_282_Kurta_Sets_17may-5fdef.jpg",
     
    },
  ];
  minValue = 0;
  maxValue = 28000;
  sliderValue = 0;

  onSliderChange(event: any) {
    console.log('Slider Value:', this.sliderValue);
  }
  
  startValue: number = 300;
  endValue: number = 400;

  onStartChange(value: string) {
    this.startValue = Number(value);
  }

  onEndChange(value: string) {
    this.endValue = Number(value);
  }



  products:Product[]=[];
  filteredProducts: Product[] = [];

  searchKey:string="";
  public filterCategory:any;
  public productList:any;
  constructor(private api:ApiService,private cartservice:CartService,private http:HttpClient,private dialogservice:DialogService){}
  ngOnInit():void{
   this.api.getproduct().subscribe(res=>{
    this.productList=res;
    this.filterCategory=res;
    this.filteredProducts=res;
    this.productList.forEach((a:any) => {
      Object.assign(a,{quantity:1,total:a.price})
      
    });
    
   })
   this.cartservice.search.subscribe((value:any)=>{
    this.searchKey=value;
   })
  }
  addtocart(item: any){
    
    this.cartservice.addtoCart(item);
  }
  sort(event: any) {
    const order = event?.target?.value;
    if (order === 'asc') {
      this.filteredProducts.sort((p1:Product, p2:Product) => {
        return p1.price>p2.price ? 1 : -1;
      });
    }
    else if(order==='dsc'){
      this.filteredProducts.sort((p1:Product, p2:Product) => {
         return  p1.price<p2.price?1:-1;
        })
      }
    }

    filter(category:string){
       this.filteredProducts=this.productList.filter((a:any)=>{
        if(a.category === category || category ==''){
          return a;
        }
       });
    }
    openDialog(item: any) {
      this.dialogservice.openDialog().then((result: boolean) => {
        if (result) {
          this.addtocart(item);
        }
      });
    }

    filterrange() {
      this.filteredProducts = this.productList.filter((product: Product) => {
        return product.price >= this.minValue && product.price <= this.sliderValue;
      });
    }
    filterrange1() {
      this.filteredProducts = this.productList.filter((product: Product) => {
        return product.price >= this.startValue && product.price <= this.endValue;
      });
    }
}

 