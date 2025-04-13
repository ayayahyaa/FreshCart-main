import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activateRoute = inject (ActivatedRoute)
  private readonly productsService = inject (ProductsService)
  private readonly cartService = inject (CartService)
  private readonly toastrService= inject(ToastrService)
  productId:any;
  productDetails :Iproduct = {} as Iproduct ;


  ngOnInit(): void {
  this.activateRoute.paramMap.subscribe({
    next:(res)=>{
      this.productId = res.get("id")
      console.log(this.productId);
      this.productsService.getSpecificProducts(this.productId).subscribe({
        next:(res)=>{
          this.productDetails = res.data ;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    },
    error:()=>{
    }
  })
}


addProductToCart(id:string):void{

  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status === 'success'){
        this.toastrService.success(res.message , 'FeshCartr' )
        this.cartService.cartNumber.set(res.numOfCartItems)
      }
  },
  })
}}

