// n1 oldVnode
//n2 newVnode
export function diff(n1,n2){
    console.log(n1,n2)
    //1.tag
    if(n1.tag !== n2.tag){
        n1.el.replaceWith(document.createElement(n2.tag))
    }else {
        const el = (n2.el = n1.el)

        //2.props
        //new : {id:'foo',class:'bar',a}
        //old : {id:'foo',class:'bar1',a,b}
        const {props:newProps} = n2
        const {props:oldProps} = n1

        if(newProps && oldProps){
            Object.keys(newProps).forEach(key => {
                const newVal = newProps[key]
                const oldVal = oldProps[key]
                if(newVal !== oldVal){
                    console.log(key,newVal)
                    el.setAttribute(key,newVal)
                }
            })
        }
        if(oldProps){
            Object.keys(oldProps).forEach(key => {
                if(!newProps[key]){
                    el.removeAttribute(key)
                }
            })
        }

        //3.children
        //1 newChildren ->  string (oldchildren -> string  oldchildren -> array)
        //2 newChildren ->  array (oldchildren -> string  oldchildren -> array)

        const {children:newChildren } = n2
        const {children:oldChildren } = n1

        if(typeof newChildren === 'string'){
            if(typeof  oldChildren === 'string'){
                if(newChildren !== oldChildren){
                    el.textContent = newChildren
                }
            }else if(Array.isArray(oldChildren)){
                el.textContent = newChildren
            }
        }else if(Array.is(newChildren)){  // 新的字节的是数组
            if(typeof oldChildren === 'string'){
                el.innerText = ''
                mountElement(n2, el)
            }else if(Array.isArray(oldChildren)){
                //new {a,b,c,d,f}
                //old {a,e,c,d}

                const length = Math.min(newChildren.length,oldChildren.length)

                for (let i = 0; i < length; i++) {
                    const newVnode = newChildren[i]
                    const oldVnode = newChildren[i]
                    diff(oldVnode,newVnode)
                }

                if(newChildren.length > length){
                    //创建节点
                    for (let i = length; i < newChildren.length; i++) {
                        const newVnode = newChildren[i]
                        mountElement(newVnode,el)
                    }
                }

                if(oldChildren.length > length){
                    //删除节点
                    for (let i = length; i < oldChildren.length; i++) {
                        const oldVnode = oldChildren[i]
                        oldVnode.el.parent.removeChild(oldVnode.el)
                    }
                }
            }
        }
    }


}
export function mountElement(vnode,container){
    const {tag,props,children} = vnode

    const el = (vnode.el = document.createElement(tag))

    //props
    if(props){
        for (const key in props) {
            const val = props[key]
            el.setAttribute(key,val)
        }
    }

    //children

    if(typeof children === 'string' || typeof children === 'number'){
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }else if(Array.isArray(children)){
        children.forEach(v => {
            mountElement(v,el)
        })
    }

    container.append(el)

}