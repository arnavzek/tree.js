
        function applyAtribute(element,attributes){

            function addchild(childs){
                
                for(let child of childs) {


                 element.appendChild(child)
                 // console.log(child,element.children)

             }

            }

            for( att in attributes ){

                var atb = attributes[att]

                if (att.toLowerCase().indexOf('on') !== -1) {
                    element.addEventListener(att.toLowerCase().replace('on',''), atb )
                }else if (att == 'text'){
                    element.appendChild( document.createTextNode(atb) )
                }else{ att == 'childs' ?  addchild(atb) : element.setAttribute(att,atb) }
                
                
                
            }

            
            return element

        }



        function $(element,attributes){
            return applyAtribute( document.createElement(element),attributes)
        }




        function render(oldDom,newDom){

    
            
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
                        // console.log( nd,'a')
                        ad(nd[appendPoint])//new item was added to the state, the new function can also be used
                    }else if(!nd[i]){
                        // console.log( nd,'b')
                        rm(od[removePoint])// item was removed in the new state 
                    }else{
                        // console.log(len,i,nd[i].tagName)
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



    var cooler = {

        setState: function(object){

            for (key in object){
                this.state[key] = object[key]
            }
            app.render()
            //set state
            //call event var event = new Event('build');
        },

        add: function(arg) {

            if (this.child == undefined) this.child = []

            arg.parent = this
            this.child.push(arg)

             


        },

        // to do state can also passed by using find, 'key' feature

        set: function(obj){
    
            for(key in obj){

                key.toLowerCase() == 'child'? null : this[key] = obj[key]

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

        for(key in obj){
            newObj[key] = obj[key]
            if ( typeof obj[key] == 'function') newObj[key] = obj[key].bind(newObj)
        }

        //auto binding
        //using classes will simplify this
        return newObj
    }

    function Dom_scan(obj) {

        let object = obj.ui()


        var build_array = undefined
        
        if (obj.build) typeof obj.build == 'object'? build_array = obj.build : build_array = obj.build()

        
        var childer = obj['child']


        childer == undefined?childer = []:null
        build_array == undefined?build_array = []:null
        

        let loop_c = 0;
        build_array.length > childer.length? loop_c = build_array.length : loop_c = childer.length

        for (var i = 0; i < loop_c; i++) {

            if(!childer[i]){

                obj.add( new_(build_array[i]) )
                if(obj.child[i].init) obj.child[i].init()

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
         

        return object

        


    }



    var app = {

            state: {},name:'tree',

            render:function (){

                this.origin == undefined? this.origin = 'app':null

                let element_seed = document.getElementById(this.origin)
                
                if (!element_seed){

                    let newele = document.createElement('div'); 
                    newele.setAttribute('id','app')
                    document.body.appendChild(newele )
                    element_seed = newele

                } 

                render(element_seed,

                    Dom_scan(this)
                )

                

            },

            ui:()=>{

                return $('div')

             },

            init: function() {

                for(key in cooler){
                    app[key] = cooler[key]
                }

                twig(app)
                main()
                app.render()

            }

            

    }



    twig = (object) =>{

        for(key in cooler){
            object[key] = cooler[key]
        }

        object.state = {}
        

        window[object.name] = function(obj){

            let main_obj = object;

            for (key in obj){
                main_obj[key] = obj[key]
            }

            return main_obj
        }

        // window[object.name] = object;
    }


    document.body.onload = app.init

   

        
