function $ (selector){
  // Verify the instance status
  if(!this instanceof $){ return new $(selector); }

  selector = selector || document.body; // Set default value for selector
  let _$ = (Object.is(selector, document)) // Verify is selector isn't document
              ? Object.create(_toDocument.prototype)
              : Object.create($.prototype);

  // If using css selectors
  if(typeof selector === "string"){
    let elements = Array.from(document.querySelectorAll(selector));

    _$.target = (elements.length === 1) ? elements[0] : elements;
  }

  return _$;
}

$.prototype.text = function(value){
  if(value === undefined) return;

  this.target.textContent = value;
  return this;
};



function _toDocument() {}
_toDocument.prototype.ready = function(callback){
  function complete(){
    document.removeEventListener('DOMContentLoaded', callback);
  }

  document.addEventListener('DOMContentLoaded', function(){
    callback();
    complete();
  });
};

$(document).ready(function() {
  $('#title').text('Hello, world');
});
