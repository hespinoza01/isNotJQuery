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

$.prototype.html = function(value){
  if(value === undefined) return;

  this.target.innerHTML = value;
  return this;
};

$.prototype.on = function(eventType, callback){
  if(eventType === undefined || typeof eventType !== "string") return;
  if(callback === undefined || typeof callback !== "function") return;

  if(this.target.addEventListener){
    this.target.addEventListener(`${eventType}`, callback);
  }else if(this.target.attachEvent){
    this.target.attachEvent('on'+eventType, callback);
  }

  return this;
};

$.prototype.off = function(eventType, callback){
  if(eventType === undefined || typeof eventType !== "string") return;
  if(callback === undefined || typeof callback !== "function") return;

  if(this.target.addEventListener){
    this.target.removeEventListener(`${eventType}`, callback);
  }else if(this.target.attachEvent){
    // TODO
  }

  return this;
};

$.prototype.addClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  this.target.classList.add(classname);
  return this;
};

$.prototype.removeClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  this.target.classList.remove(classname);
  return this;
};

$.prototype.toggleClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  this.target.classList.toggle(classname);
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
