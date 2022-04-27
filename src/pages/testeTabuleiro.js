import React from 'react';

export const Tabuleiro = () => {

    function setup() {
        createCanvas(600, 600);
        const c = color('#2D6C43');
        fill(c);
        strokeWeight(2);
        
      }
      
      function draw() {
        background('#2D6C43');
      
        
        square(0,0,100)
        square(100,0,100)
        square(200,0,100)
        square(300,0,100)
        
        square(0,100,100)
        square(100,100,100)
        square(200,100,100)
        square(300,100,100)
        
        square(0,200,100)
        square(100,200,100)
        square(200,200,100)
        square(300,200,100)
        
        square(0,300,100)
        square(100,300,100)
        square(200,300,100)
        square(300,300,100)
        
        triangle(200,400,50,550,200,550)
        triangle(200,400,200,550,350,550)
        line(120,480,280,480) //linha do triangulo
        
        line(0,0,400,400)
        line(200,0,400,200)
        line(0,200,200,400)
        
        line(0,400,400,0)
        line(200,0,0,200)
        line(400,200,200,400)
        
        circle(0,0,10)
        circle(0,0,10)
        circle(100,100,10)
      }
      return(
        draw()
      )
    }