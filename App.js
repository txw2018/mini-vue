
import {reactive, effectWatch} from './core/reactivity/index.js'
import {h} from "./core/h.js";

// const user = reactive({
//     age:24
// })
//
// let double
//
// effectWatch(()=>{
//     double = user.age
//     console.log(double)
// })
//
// user.age += 1

 const App =  {
    render(context){

        //reset
       return h('div',{
           id:"app-id"+context.state.count
       },[
           h('p',null,'heihei'),
           h('p',null,'hhha'),
       ])
    },

    setup(){
      const state = reactive({
          count:0
      })
        window.state = state
        return {state}
    }
}

export default App