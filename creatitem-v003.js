function loadarrays (classname){
// finne alle elementer med create class
var els = document.getElementsByClassName(classname);
for(var i = 0; i < els.length; i++)
{

  if (els[i].tagName.toLowerCase() === 'input') {
    console.log('element is an input');
  }else if (els[i].tagName.toLowerCase() === 'select'){
    console.log('element is an input');
  }


}
}

