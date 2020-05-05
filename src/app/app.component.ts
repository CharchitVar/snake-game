import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SnackGame';

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>; 
  @HostListener('window:keyup', ['$event']) keyEvent(eve: KeyboardEvent) {
    this.keyPrerssed(eve);
    console.log(eve);
  }
  private ctx: CanvasRenderingContext2D;
  imageName;
   snake: any[]=[];
   box: number =20;
  applePosition: any[]=[];
  score: number =0;
  direction :string;
  currentPositionX: number;
  currentPositionY: number;
  foodPositionX: number;
  foodPositionY:number;
  horizontalMovement: boolean =false;
  verticalMovement:boolean =false;
  newWidth: number =0;
  newHeight: number =0;
  i;
  constructor(private cdk: ChangeDetectorRef, private zone : NgZone){

  }


  ngOnInit(): void {
    this.imageName = new Image();
    this.imageName.src="../assets/apple.jpg"
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ctx.drawImage(this.imageName,260,140,20,20);
    this.animate();
    this.foodPositionX=(Math.floor(Math.random() * 30));
    this.foodPositionY=(Math.floor(Math.random() * 30));
  }
  animate() {
    this.ctx.fillStyle = 'red';

    //this.move(1,20);
   this.moveNew(1,8)

  }


  keyPrerssed(eve){
     if(eve.keyCode === 37 && this.direction !='right'){
      this.direction = 'left';
     }
     else if(eve.keyCode === 38 && this.direction !='down'){
      this.direction = 'up';
     }
     else if(eve.keyCode === 39 && this.direction !='left'){
      this.direction = 'right';
     }
     else if(eve.keyCode === 40 && this.direction !='up'){
      this.direction = 'down';
     }
     if(this.direction === 'left'){
     this.currentPositionX-=1;
     clearInterval(this.i);
      this.verticalMovement = false;
      this.horizontalMovement = true;
     this.moveNewForXLeft(this.currentPositionX, this.currentPositionY);
     
       
     }
     if(this.direction === 'up'){
      //snakeY -=this.box;
      this.currentPositionY-=1;
      clearInterval(this.i);
      this.verticalMovement = true;
      this.horizontalMovement = false;
      this.moveNewForYUpwards(this.currentPositionX, this.currentPositionY);
      
    }

    if(this.direction === 'right'){
      //snakeX +=this.box;
      this.currentPositionX+=1;
      clearInterval(this.i);
      this.verticalMovement = false;
      this.horizontalMovement = true;
      this.moveNew(this.currentPositionX, this.currentPositionY);
      
    }

    if(this.direction === 'down'){
     this.currentPositionY+=1;
     clearInterval(this.i);
     this.verticalMovement = true;
     this.horizontalMovement = false;
     this.moveNewForYDownward(this.currentPositionX, this.currentPositionY);
    }
    
    //this.moveNew(this.currentPositionX, this.currentPositionY);
    let i= this.snake.length;


    }

  draw(x: number, y: number, z: number, newWidth, newHeight) {
    this.currentPositionX=x;
    this.currentPositionY=y;
    if(x === this.foodPositionX && y=== this.foodPositionY){
      this.foodPositionX=(Math.floor(Math.random() * 30));
      this.foodPositionY=(Math.floor(Math.random() * 30));
      this.score++;
      // if(this.verticalMovement){
      //  this.newHeight=z*2;
      //   this.ctx.fillRect(z * x, z * y, z, z*2);
      // }
      // else if(this.horizontalMovement){
      // this.newWidth=z*2;
      //   this.ctx.fillRect(z * x, z * y, z*2, z);
      // }
    }
    // if(newHeight !=0){
    //   this.ctx.fillRect(z * x, z * y, z, newHeight);
    // }
    // else if(newWidth!=0){
    //   this.ctx.fillRect(z * x, z * y, newWidth, z);
    // }
    // else{
      this.ctx.fillRect(z * x, z * y, z, z);
    
   
    

  }
    
  // move(y: number, z: number) {
  //   const max = this.ctx.canvas.width / z;
  //   const canvas = this.ctx.canvas;
  //   let x = 0;
  //   const i = setInterval(() => {
  //     this.ctx.clearRect(0, 0, canvas.width, canvas.height);   
  //     this.ctx.drawImage(this.imageName,260,140,20,20);   
  //     this.draw(x, y, z);

  //     x++;
  //     if (x >= max) {
  //       clearInterval(i);
  //       this.move(y,z);
  //     }
  //   }, 200);    
  // }

  moveNew(x: number, y: number) {
   // const max = this.ctx.canvas.width / z;
    const max= 30
    const canvas = this.ctx.canvas;

;
  
   this.i = setInterval(() => {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);   
    this.ctx.drawImage(this.imageName,this.foodPositionX *20,this.foodPositionY*20,20,20);  
    
    this.draw(x, y, 20, this.newWidth, this.newHeight);
    x++; 
 
    if (x >= max) {
      clearInterval(this.i);
      this.moveNew(0,y);
    }
  }, 200);   
 
   
}

moveNewForYDownward(x: number, y: number) {
  // const max = this.ctx.canvas.width / z;
   const max= 30
   const canvas = this.ctx.canvas;

 
  this.i = setInterval(() => {
   this.ctx.clearRect(0, 0, canvas.width, canvas.height);   

   this.ctx.drawImage(this.imageName,this.foodPositionX *20,this.foodPositionY*20,20,20); 
   this.draw(x, y, 20, this.newWidth, this.newHeight);
   y++; 

   if (y >= max) {
     clearInterval(this.i);
     this.moveNewForYDownward(x,0);
   }
 }, 200); 

  
}

moveNewForYUpwards(x: number, y: number) {
  // const max = this.ctx.canvas.width / z;
   const max= 20;
   const min=-1;
   const canvas = this.ctx.canvas;

 
  this.i = setInterval(() => {
   this.ctx.clearRect(0, 0, canvas.width, canvas.height);   
   this.ctx.drawImage(this.imageName,this.foodPositionX *20,this.foodPositionY*20,20,20);  
   this.draw(x, y, 20, this.newWidth, this.newHeight);
   y--; 

   if (y <= min) {
     clearInterval(this.i);
     this.moveNewForYUpwards(x,30);
   }
 }, 200); 

  
}
moveNewForXLeft(x: number, y: number) {
  // const max = this.ctx.canvas.width / z;
   const max= 20;
   const min =-1;
   const canvas = this.ctx.canvas;

 
  this.i = setInterval(() => {
   this.ctx.clearRect(0, 0, canvas.width, canvas.height);   
   this.ctx.drawImage(this.imageName,this.foodPositionX *20,this.foodPositionY*20,20,20); 
   this.draw(x, y, 20, this.newWidth, this.newHeight);
   x--; 

   if (x <= min) {
     clearInterval(this.i);
     this.moveNewForXLeft(30,y);
   }
 }, 200); 

  
}
     
  
}
