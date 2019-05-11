# tree.js

A good starting point if you want to make your own reactive library like react.js, with cold simple vanilla js


efficient with the most minimal code. that's a little exaggerated cause you are here and you can do better

code is self explanable

how to use
in the main function(){

you declare a new component with addon()

        addon({
            name: "counter", // (this will be variable we will call in the main tree)

            addCount: function(){
                this.setState({count: this.state.count+1}) // our sweet setState 
            },
            
            ui:function(){
                return $('button', {
                  text:this.state.count, onClick: this.local+'.addCount()' } ) 
            },  //(you don't need to touch html)

            init:function(){ default value for state}
            
          })

and add that to the main tree by simply putting the variable

    app.set({

        origin: html element,
        build: [counter] (you just call the varible, told ya and .set if you like variety)

    }) 


}
