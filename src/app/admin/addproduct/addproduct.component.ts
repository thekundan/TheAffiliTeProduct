import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { iif } from 'rxjs';
import {ConnectService} from '../connect.service';
import {ImageResult} from '../model/img.model';
import {Product} from '../model/product.model'
import { ActivatedRoute } from '@angular/router';
import {Login} from '../model/login.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})


export class AddproductComponent implements OnInit {
  open: boolean = true;
  dismissible: boolean = true;
  timeout: number = 10000;
  public imageurl="";
public imagedata :ImageResult;
public IsWait=false;
public alertmessage="Product added sucessfully";
//public imageurl="https://theaffiliateproduct.s3.ap-south-1.amazonaws.com/2146727952.jpg";
constructor(private router: Router,private fb: FormBuilder,private connect:ConnectService,private route: ActivatedRoute) { 
 
}

public logindata :Login;
checklogin()
  {
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.connect.checkuserAuthentication().subscribe(data =>{
        this.logindata=data;
        if(this.logindata.status!=200)
        {
         localStorage.clear
         this.router.navigate(['/admin/login']);
 	}
      })
    }
    else{
    this.router.navigate(['/admin/login']);
    }
  }
id: number;
getData(): void {
  console.log('this.route.snapshot.paramMap.get(', typeof this.route.snapshot.paramMap.get('id'));
  this.id = +this.route.snapshot.paramMap.get('id');
  if(this.id!=0)
  {
    this.productinfo();
  }
  }
  public singledata : Product;
productinfo()
{
  this.connect.getsingleproducts(this.id).subscribe(data =>
    {
      this.singledata=data;
      this.imageurl=this.singledata.url;
      this.onChangecator(this.singledata.category);
      this.addproductform=this.fb.group({
        id:[this.singledata.id],
        affiliatewebsite: [this.singledata.affiliatewebsite],
        category: [this.singledata.category],
        subcategory: [this.singledata.subcategory],
        productname: [this.singledata.name],
        productimage: [],
        productdesc:  [this.singledata.longdescription],
        productlink:  [this.singledata.weblink],
        offerprice:  [this.singledata.offerprice],
        origprice:  [this.singledata.origprice]
       
      })
      
    })
    this.affiliatewebsitech=false;
    this.categorych=false;
    this.subcategorych=false;
    this.productnamech=false;
    this.productimagech=false;
    this.productdescch=false;
    this.productlinkch=false;
    this.offerpricech=false;
    this.origpricech=false;
}  
public isVisible: boolean = false;

public alertmsg="Product added sucessfully";
showAlert() : void {
  if (this.isVisible) { 
    return;
  } 
  this.isVisible = true;
  setTimeout(()=> this.isVisible = false,2500)
}
selectedAffiliate='Choose Affiliate Website';


toppingList: string[] = [];

ngOnInit(): void {
  this.getData();
  this.checklogin();
  }
  offerprice ="";
  addproductform: FormGroup = this.fb.group({
    id:[''],
    affiliatewebsite: ['Choose Affiliate Website', [Validators.required, Validators.required]],
    category: ['Choose Category'],
    subcategory: ['Choose Sub Category', [Validators.required, Validators.required]],
    productname: ['', [Validators.required]],
    productimage: [],
    productdesc:  ['', [Validators.required]],
    productlink:  ['', [Validators.required]],
    offerprice:  [this.offerprice],
    origprice:  ['']
    
  })
  numberOnly(event): boolean {
    this.changecssorigprice();
    this.changecssofferprice();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  saveproduct()
  {
    let offerpric = /^\d+$/.test(this.addproductform.value.offerprice);
    let origpric = /^\d+$/.test(this.addproductform.value.origprice);

   if(!offerpric || !origpric)
   {
      if(!offerpric)
       this.offerpricech=true;
       if(!origpric)
       this.origpricech=true;

     return;
   }
    this.callcssvalidiator();
    if(!this.origpricech && !this.offerpricech && !this.productlinkch && !this.affiliatewebsitech && !this.categorych && !this.subcategorych && !this.productnamech && !this.productimagech && !this.productdescch)
    {
     this.connect.addproduct(this.addproductform.value.affiliatewebsite,this.addproductform.value.category,this.addproductform.value.subcategory,this.addproductform.value.productname,this.addproductform.value.productlink,this.imageurl,this.addproductform.value.origprice,this.addproductform.value.offerprice,this.addproductform.value.productdesc).subscribe(data =>
      {
        this.showAlert();
        this.clearform();
      });
       
    }
    else{
      return;
    }
  }


  onimagesubmit(event)
  {    

    this.IsWait=true;
        this.isdiabled=true;
        this.submitbutton="Please wait ....";
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        this.connect.uploadimage(file).subscribe(data =>
          {
            this.imagedata=data;
            this.imageurl=this.imagedata.imageurl;
            this.isdiabled=false;
            this.submitbutton="Submit";
            this.IsWait=false;
          })
          this.changecssimage();
  }
  onChangecat(category) {
    this.changecsscategorych();
    this.onChangecator(category);
  }
  onChangecator(category) {
   
    if(category=="Jewellery")  
    {
      this.toppingList=['Earrings','Chains & Necklaces','Bangles & Bracelets','Rings','Pendants','Mangalsutras & Tanmaniyas','Nose Rings & Pins','Hair Accessories','Toe Rings','Anklets','Body Jewellery','Brooches & Pins','Beads & Charms','Coins & Bars','Loose Gemstones & Diamonds'];
    }
    else if(category=="Luggage & Bags")
    {
      this.toppingList=['Bags & Backpacks','Luggage','Wallets, Card Cases & Money Organizers','Travel Accessories','Handbags & Clutches','Shopping Bags & Baskets'];
    }
    else if(category=="Shoes")
    {
      this.toppingList=['Boys','Girls','Men','Women','Athletic Shoes Accessories'];
    }
    else if(category=="Watches")
    {
      this.toppingList=['Wrist Watches','Watch Bands','Pocket Watches','Smart Watches'];
    }
    else if(category=="Electronics")
    {
      this.toppingList=['Cameras & Photography','Car & Vehicle Electronics','GPS & Accessories','Headphones','Home Audio','Home Theater, TV & Video','Portable Media Players','Telephones & Accessories','Wearable Technology'];
    }
    else if(category=="Computers & Accessories")
    {
      this.toppingList=['Accessories & Peripherals','Components','Desktops','External Devices & Data Storage','Laptops','Monitors','Networking Devices','Printers, Inks & Accessories','Scanners','Tablets'];
    }
    else if(category=="Men's Clothing & Accessories")
    {
      this.toppingList=['Clothing Sets','Shirts','Fashion Hoodies & Sweatshirts','Sweaters','Jackets & Coats','Jeans','Pants','Shorts','Swim','Suits & Sport Coats','Underwear','Socks','Sleep & Lounge','T-Shirts & Tanks','Sports'];
    }
    else if(category=="Women's Clothing & Accessories")
    {
      this.toppingList=['Tops, Tees & Blouses','Fashion Hoodies & Sweatshirts','Jeans','Pants & Capris','Shorts','Swimsuits & Cover Ups','Lingerie, Sleep & Lounge','Jumpsuits, Rompers & Overalls','Coats, Jackets & Vests','Suiting & Blazers','Socks & Hosiery','Clothing Sets','Dresses','Skirts & Skorts','Sweaters','Leggings','Underwear'];
    }
    else if(category=="Baby")
    {
      this.toppingList=['Baby Care','Baby Clothing','Baby Safety','Baby Shoes','Car Seats  Accessories','Diapering & Nappy Changing','Feeding','Gift Packs','Maternity','Pacifiers & Teethers','PottyTraining  & StepStools','Strollers, Buggies & Prams'];
    }
    else if(category=="Beauty")
    {
      this.toppingList=['Luxury Beauty','Make-up & Nails','Skin Care','Hair Care','Bath Body','Fragrance','Tools Accessories','Mens Grooming'];
    } else if(category=="Books")
    {
      this.toppingList=['Arts, Film &amp; Photography','Biographies, Diaries &amp; True Accounts','Business &amp; Economics','Childrens &amp; Young Adult','Computing, Internet &amp; Digital Media','Crafts, Home &amp; Lifestyle','Health, Family &amp; Personal Development','Humour','Language, Linguistics &amp; Writing','Literature &amp; Fiction','Politics','Reference','Religion','Sciences, Technology &amp; Medicine','Society &amp; Social Sciences','Sports','Travel','Action &amp; Adventure','Comics &amp; Mangas','Crime, Thriller &amp; Mystery','Fantasy, Horror &amp; Science Fiction','Historical Fiction','Romance','Maps &amp; Atlases','Exam Preparation','History','Law','Textbooks &amp; Study Guides'];
    }
    else
    {
      this.toppingList= [];
    }
  }

  affiliatewebsitech=false;
  categorych=false;
  subcategorych=false;
  productnamech=false;
  productimagech=false;
  productdescch=false;
  productlinkch=false;
  offerpricech=false;
  origpricech=false;
  isdiabled=false;

  public submitbutton="Submit";
  

  callcssvalidiator()
  {
    this. changecssaffiliatewebsite();
    this.changecsscategorych();
    this.  changecsssubcategorych();
    this.changecssproductdescch();
    this.changecssproductnamech();
    this.changecssimage();
    this.changecssproductlink();
    this.changecssorigprice();
    this.changecssofferprice();
  }
  changecssorigprice()
  {
    if(this.addproductform.value.origprice.length === 0 || this.addproductform.value.origprice < 1)
            this.origpricech=true;
    else
            this.origpricech=false;

  }
  changecssofferprice()
  {
    if(this.addproductform.value.offerprice.length === 0 || this.addproductform.value.offerprice < 1)
            this.offerpricech=true;
    else
            this.offerpricech=false;
  }
  changecssproductlink()
  {
    if(this.addproductform.value.productlink.length === 0)
            this.productlinkch=true;
    else
            this.productlinkch=false;
  }

  changecssaffiliatewebsite()
  {
    if(this.addproductform.value.affiliatewebsite=='Choose Affiliate Website')
            this.affiliatewebsitech=true;
    else
            this.affiliatewebsitech=false;
  }
  changecsscategorych()
  {
    if(this.addproductform.value.category=='Choose Category')
            this.categorych=true;
    else
            this.categorych=false;
  }
  changecsssubcategorych()
  {
    if(this.addproductform.value.subcategory=='Choose Sub Category')
        this.subcategorych=true;
    else
        this.subcategorych=false;
  }
  changecssproductdescch()
  {
   
    if(this.addproductform.value.productdesc.length === 0 )
        this.productdescch=true;
    else
       this.productdescch=false;
  }
   
  changecssproductnamech()
  {
   
    if(this.addproductform.value.productname.length === 0 )
             this.productnamech=true;
     else
              this.productnamech=false;
  
  }
  changecssimage()
  {
    if(this.imageurl.length === 0)
        this.productimagech=true;
     else
        this.productimagech=false;
  }

  clearform()
{
  this.imageurl="";
  this.affiliatewebsitech=false;
  this.categorych=false;
  this.subcategorych=false;
  this.productnamech=false;
  this.productimagech=false;
  this.productdescch=false;
  this.productlinkch=false;
  this.offerpricech=false;
  this.origpricech=false;
    this.addproductform=this.fb.group({
      id:[''],
      affiliatewebsite: ['Choose Affiliate Website', [Validators.required, Validators.required]],
      category: ['Choose Category'],
      subcategory: ['Choose Sub Category', [Validators.required, Validators.required]],
      productname: ['', [Validators.required]],
      productimage: [],
      productdesc:  ['', [Validators.required]],
      productlink:  ['', [Validators.required]],
      offerprice:  [''],
      origprice:  ['']
      
    })
    
}


}
