import Vue from 'vue'

Vue.filter('phoneNumber', param => {
  let value = param.toString();


  if(value.charAt(0)=='0'){
          return value.slice(0,3)+'/'+value.slice(3,7)+'-'+value.slice(7);
        }
        else{
    return '+('+value.slice(0,3)+')'+value.slice(3,5)+'-'+value.slice(6,9)+'-'+value.slice(9);
}

});
Vue.filter('accNumber',param=>{
  let value=param.toString();
  return value.slice(0,3)+'-'+value.slice(3,16)+'-'+value.slice(16);
})



Vue.filter('thousandSeparator',params=>{
let value=params.toString();
 return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

})
