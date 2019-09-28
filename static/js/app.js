
//###########Global Data Mapping//
console.log("--------------------")
d3.json("/globalData", function(data){
  console.log("Inside globalData")
  console.log(data)
  createMap(data.features);
 });

