function loadarrays (classname){
// finne alle elementer med create class
var fieldnamesarray = [];
var fieldvaluearray = [];

var els = document.getElementsByClassName(classname);
for(var i = 0; i < els.length; i++)
{
  const element = els[i];
  if (element.tagName.toLowerCase() === 'input') {
    //input field 
    
    fieldnamesarray.push(element.name);
    fieldvaluearray.push(element.value);

  }else if (element.tagName.toLowerCase() === 'select'){
    var array = element.value.split(",");
    //sjekke om det er en array
    if(array.length >1){
      // er mer en et element
    fieldnamesarray.push(element.name);
    fieldvaluearray.push(array);
    }else{
      // er ikke array
      fieldnamesarray.push(element.name);
      fieldvaluearray.push(element.value);
    }


  }


}

console.log("Names:",fieldnamesarray,"Value:",fieldvaluearray);
}

