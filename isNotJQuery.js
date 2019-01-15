const $ = function(arg){
  // Get the element(s)
  let elements = Array.from(document.querySelectorAll(arg));

  // If no element is found return and break the code
  if(elements.length === 0){ return undefined; }

  // If elements length === 1 convert the array to unique value in target
  this.target = (elements.length === 1) ? elements[0] : elements;

  // Is the object is not instance of $ return the node element
  if(this instanceof $ === false){ return this.target; }
};

let data = $("#title");
