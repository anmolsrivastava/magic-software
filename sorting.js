function sort(a) {
    let last = a[a.length-1]
    //console.log('####',last)
    for(let i=a.length-2; i>=0; i--) {     
        if(last<a[i]) {
            //console.log(i, a[i])
            //console.log('if')
            a[i+1] = a[i]
            if(i===0) {
                a[i] = last
            }
            console.log(a)
        } else if(last>a[i]) {
            //console.log('else')
            a[i+1] = last
            console.log(a)
            break
        }       
    }
    //console.log(a)
}


console.log(sort([4,5,6,8,9,7]))