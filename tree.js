        util = {

            detach: function ( child, parent, scene ) {

                child.applyMatrix( parent.matrixWorld );
                parent.remove( child );
                scene.add( child );

            },

            attach: function ( child, scene, parent ) {

                child.applyMatrix( new THREE.Matrix4().getInverse( parent.matrixWorld ) );

                scene.remove( child );
                parent.add( child );

            }

        };






        function KeyExist(word){

            var count = 0;

            for( names in body ){
                if (word == names) {count++}
            }

            return count;
        }

        // format key in array

        function fncall(key){

        }



        function applyAtribute(element,attributes){

            function addchild(childs){
                
                for(let child of childs) {


                 element.appendChild(child)
                 // console.log(child,element.children)

             }

            }

            for( att in attributes ){

                if (att == 'text') {
                        element.appendChild( document.createTextNode(attributes[att]) )
                }else{ att == 'childs' ?  addchild(attributes[att]) : element.setAttribute(att,attributes[att]) }
                
                
                
            }

            
            return element

        }



        function $(element,attributes){
            return applyAtribute( document.createElement(element),attributes )
        }

        //to be revamped into dynamic auto generate function with the name of html tag itself

        // function __(id,what){

        //     what == 'class'? return(document.getElementsByClassName(id)[0]) : return (document.getElementById(id))
        // }

        function C(location){
            var locationArray = location.split('.')
            return locationArray[locationArray.length - 1]
        }

        function ___(key,object,prop){

            eval("body."+key+" = object")

            // eval("body."+key+".state.location = body."+key)
            // console.log(object)
            eval( "var bodyIntermediate = body."+key)
            // console.log(bodyIntermediate)
            // we can't associate body with key for a setter function because it becomes an object (so it needs to be outside eval)
            // location was initialized as an object
            bodyIntermediate.state = {}
            bodyIntermediate.local = "body."+key
            bodyIntermediate.key = C(key)

            return eval("body."+key+".onStart(prop)")
 
        }


        //addon array will be downloaded from the server and save it into local storage
        function P(location){
            var locationArray = location.split('.')
            return locationArray[locationArray.length - 2]
        }



        var addon = {}


        function locally(what,data){
            return what.local.replace(/body./gi,'')+"."+data
        }



        function ARlength(ar) {

                    if ( !Array.isArray(ar) ) {
                        return 0;
                    }
                    //object array length
                    var i = 0;

                    for( val in ar){
                        i++
                    }

                    return i;
        }

        // to do: text content update

        function update_childnode(od,nd,dom){

             

                var len;
                od.length > nd.length? len = od.length : len = nd.length;// which is bigger new array or old array

                        
                var appendPoint = od.length;// appendChild() removes the object from new object
                var removePoint = nd.length;//  removing will reset array length




                for (var i = 0; i < len; i++) {


                    // console.log('a')

                    if (!od[i]){
                        dom.addChild(nd[appendPoint])//new item was added to the state
                    }else if(!nd[i]){
                        dom.removeChild(od[removePoint])// item was removed in the new state 
                    }else{
                        od[i].data = nd[i].data
                    }                         
                                
                }




                

            }

            var c = 0;

        function render(oldDom,newDom){

            c++
            
            function init(type) {

                if(type == '3d' ){
                    this.type = '3d'
                    this.canBeUpdated = ['rotation','scale','quaternion','position','matrix']
                }else{
                    this.type = 'html'
                    this.canBeUpdated = ['attributes','style','className','classList','data']
                }
            }
            // to do: investigating why appending child deletes it from the original object

            function rm(obj) {
                this.type == 'html'? oldDom.removeChild( obj ) : oldDom.remove(obj)
            }

            function ad(obj) {
                this.type == 'html'? oldDom.appendChild( obj ) : oldDom.add(obj)
            }

            oldDom.uuid == null? init('html') :  init('3d')
            //text node exist in the first case because whole div is appended

            // console.log( newDom.tagName )
            //only the first child is recursivly called


             function lp_array(od,nd){

                var len;
                od.length > nd.length? len = od.length : len = nd.length;// which is bigger new array or old array

                
                var appendPoint = od.length;// appendChild() removes the object from new object
                var removePoint = nd.length;//  removing will reset array length

                // if(c>100){
                //     // c = 0
                //     return 
                // }

                for(let i = 0; i < len; i++){
                    
                    if (!od[i]){
                        console.log( nd,'a')
                        ad(nd[appendPoint])//new item was added to the state, the new function can also be used
                    }else if(!nd[i]){
                        console.log( nd,'b')
                        rm(od[removePoint])// item was removed in the new state 
                    }else{
                        console.log(len,i,nd[i].tagName)
                          render( od[i], nd[i] )
                        // problem found: when a child is in the loop for loop doesn't proceeds
                        
                    }


                }

            }


            if ( newDom['childNodes'][0] !== undefined && newDom['childNodes'][0].nodeName == "#text") {
                    render( oldDom['childNodes'][0],newDom['childNodes'][0] )
                    // to do: why recursion increses so much if loop array is called: because childnode has button
            }


            for (key of this.canBeUpdated){
                ( oldDom[key] !== undefined  && oldDom[key] !== newDom[key]  && newDom[key] != '')? oldDom[key] = newDom[key] : null
            }

            if( oldDom['children'] !== undefined){  lp_array(oldDom['children'],newDom['children']) } 


        }



        //whenever set state is called like setstate(body, editor.mousestatus) call the render method associated with object

        //how set state and can be ubiquitous around all ___() | sol: render function as an object will return the new obj
        //___() should take (prop)

        //how to update space as it is a secondary child and has a lot of exceptions

        //key is the unique name

        function say(path,data){

            for(key in data){
                path.state[key] = data[key]
            }

            path.render()
            // console.log(path);
        }




        // to do: child class is not updating

        addon.editmode = {

            onStart: function(prop){

                return(

                    $('button',{
                        onClick:this.local+".onPresorigin()",
                        text:prop.class,
                        class:prop.class+"k"

                    })

                )

            },

            onPresorigin: function (){
                console.log('error')
            }
        }


        addon.space = {

            init: function(argument) {

                this.state = { children: [] }
                this.state.children[0] = new THREE.Scene();
                this.state.children[1] = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 3000 );
                this.state.children[2] = new THREE.WebGLRenderer({ antialias: true });

                const animate = () => {
                    requestAnimationFrame( animate );
                    this.state.children[2].render( this.state.children[0], this.state.children[1] );
                };

                animate(this);

                body.state.space.content = this.state;
            },

            onStart: function(prop) {

                this.state.children == undefined ? this.init():null;
                return this.state.children[2].domElement
                
            },

        }

    function set_x(nw,obj) {

            for(key in obj){

                key.toLowerCase() == 'child'? null : nw[key] = obj[key]

            }

            return nw;
    }

    var cooler = {

        setState: function(object){

            for (key in object){
                this.state[key] = object[key]
            }
            app.render()
            //set state
            //call event var event = new Event('build');
        },

        parent:function(obj){
            return eval(obj.local)
            // to do replace [xx]
        },

        add: function(...arg) {

            if (this.child !== undefined) {
                // len = this.child.length
            }else{
                this.child = []
            }
                
            arg[0].constructor === Array? arg = arg[0] :null

            for(i=0; i<arg.length; i++){

                this.child.push(arg[i])

                // console.log()
                // var len = this.child.length

                // this.child[this.child.length-1].init()

                this.child[this.child.length-1].local = this.local+".child["+(this.child.length -1)+"]"

                // how to access parent's data
             }


        },

        // to do state can also passed by using find, 'key' feature

        set: function(obj){


            if (this.type == 'controller') {
                return set_x(this,obj)
            }else{
                var nw = this
                return  set_x(nw,obj)

            }
            


        },

        find: function(id){

            function scan(obj,key){
                for( index of this.childs){

                    function recur(){
                        this.childs[index].childs.length > 0 ? scan(this.childs[index].childs,key): null
                    }

                    // key == this.childs[index].key? return( this.childs[index] ) : recur()

                }

            }

            scan(this,id)

        }

    }


    function new_(obj){

        var newObj = {}

        for(key in obj){ newObj[key] = obj[key] }

        return newObj
    }

    function Dom_scan(obj) {

        let object = obj.ui()
        var build_array = obj.build
        var childer = obj['child']


        childer == undefined?childer = []:null
        build_array == undefined?build_array = []:null
        

        let loop_c = 0;
        build_array.length > childer.length? loop_c = build_array.length : loop_c = childer.length

        for (var i = 0; i < loop_c; i++) {

            if(!childer[i]){
                obj.add( new_(build_array[i]) )
                obj.child[i].init()
            }else if(!build_array[i]){
                // obj.remove(i)
            }else{
                //make changes otherwise & keep state
                for(key in build_array[i]){

                    if( key.toLowerCase()  != 'child' || key.toLowerCase()  != 'state'){
                        // obj.child[i][key] = build_array[i][key]
                    }

                }

            }

        }

        var childer = obj['child']
        childer == undefined?childer = []:null

        for(i=0; i<childer.length; i++){
            object.appendChild( Dom_scan(childer[i]) )
        }

         // function parseOnClick(chart){


         //     for(key in chart){

                

         //        if (key.toLowerCase() == 'onclick'){

         //            console.log( chart[key] )
                    
         //        }else if(key == 'children'){

         //            // console.log( object['children'] )

         //            function recurse(){

         //                for( i=0; i < object['children'].length ; i++){

         //                    // console.log(object['children'][i]) 

         //                    parseOnClick(object['children'][i])
         //                }

         //            }

         //            object['children'].length !== 0? recurse() : null

         //        }

         //     }
         // }

         
         // parseOnClick(object)

         //on click parse

        return object

        


    }



    var app = {

            state: {mode: 'editor' , editor:{class:'menu'} , space:{ helpers:[] , content:{} } },
            local:'app',type:'controller',

            //download state
            render:function (){

                this.origin == undefined? this.origin = 'app':null

                //update html dom

               

                render( document.getElementsByTagName(this.origin)[0],

                    Dom_scan(this)
                )

                
                //update space dom
                // render(body.dimension.state, this.state.space.content)
            },

            ui:()=>{

                return $('div')

             },

            init: function() {

                for(key in cooler){
                    this[key] = cooler[key]
                }

                main()
                this.render()

            }

            

    }

    function _($){
        for(key in cooler){
            $[key] = cooler[key]
        }

        return $;
    }

    addon = (object) =>{
        window[object.name] = _(object);
    }

document.addEventListener("DOMContentLoaded",  app.init() )


    // app.init()




    


// the form of component
// pre built component
// to do fix return


function main(){




    addon({

            name: "inputBox",

            start: function(){
                this.state = parent(this).state
            },
            
            ui:()=>{
                return $('input', { value: this.text })
            }
            

          })





        addon({

            name: "counter2",

            addCount: function(){

                // this.state.count = this.state.count+1;

                // app.render()
                console.log(this.state.count)
                this.setState({count: this.state.count+1 })

            },

            // pb: addCount gets executed on object instantiation
            
            ui:function(){
                return $('button', { text:this.state.count, onClick: this.local+'.addCount()' } ) 
            },

            init:function(){
                this.state = {}
                this.state.count = 0
                console.log(this)

            }
            

          })


        addon({

            name: "counter",

            addCount: function(){

                // this.state.count = this.state.count+1;

                // app.render()
                console.log(this.state.count)
                this.setState({count: this.state.count+1 })

            },

            // pb: addCount gets executed on object instantiation
            
            ui:function(){
                return $('button', {

                 text:this.state.count, onClick: this.local+'.addCount()'
         

                } )   


                // whenever the render function is called the old data is lost

               
            },

            init:function(){
                this.state = {}
                this.state.count = 0
                // console.log(this.local,counter.local)

            }
            

          })


        addon({

            name: "counter3",

            addCount: function(){

                // this.state.count = this.state.count+1;

                // app.render()
                console.log(this.state.count)
                this.setState({count: this.state.count+1 })

            },

            // pb: addCount gets executed on object instantiation
            
            ui:function(){

                return $('span',{

                    text:this.state.count,
                    childs:[ $('button', { text:'Go '+this.state.count, onClick: this.local+'.addCount()' })  ]

                    }
                )
            },

            init:function(){
                this.state = {}
                this.state.count = 0
                console.log(this)

            }
            

          })


      app.set({

        origin: 'app',
        build: [counter3,counter3,counter3,counter]

    }) 

}


   

        
