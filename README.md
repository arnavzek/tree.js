# Tree.js

A good starting point if you want to make your own reactive library like react.js, with cold simple vanilla js & without classes

how to use: in the main function(){
```
twig({ 
   name: "counter", //you declare a new component with twig()

   addCount: function(){
       this.setState({count: this.state.count+1}) // our sweet setState 
   },
            
   ui:function(){
       return $('button', {
         text:this.state.count, onClick: addCount 
       } ) 
   },
            
 })

 tree({
       build: [ counter() ] //counter can have build method and it's childs and it's child can have child... quite like html but with js and
                            //you can pass in new functionality as parameters
   }) 

        
}
```
check out todo_app.html

#Benefits over conventional react library<br>
        *It doesn't depend on prop instead you use this.parent, so twigs(components) are easily swappable<br>
        *all method of the component are binded by default<br>
        *components are real functions, pass methods as parameter and it will be applied to the twig<br>
<br>
