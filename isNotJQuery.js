function $ (selector){
  // Verify the instance status
  if(!this instanceof $){ return new $(selector); }

  selector = (typeof selector !== "undefined") ? selector : document.body; // Set default value for selector
  let _$ = Object.create($.prototype);

  // If using css selectors
  if(typeof selector === "string"){
    let elements = Array.from(document.querySelectorAll(selector));

    _$.target = (elements.length === 1) ? elements[0] : elements;
  }else if(Object.is(selector, document) || Object.is(selector, window)){
    _$.target = selector;
  }else{
    throw new TypeError('Selector argument is not valid');
  }

  return _$;
}


/*
*     Others utils prototype methods
* */

$.prototype.find = function(selector){
  if(selector === undefined || typeof selector !== "string") return;

  let elements = Array.from(this.target.querySelectorAll(selector));
  return (elements.length === 1) ? elements[0] : elements;
};

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

$.prototype.empty = function(){
  this.target.innerHTML = '';
  return this;
};

$.prototype.hide = function(){
  this.target.style.display = 'none';
  return this;
};

$.prototype.show = function(){
  this.target.style.display = '';
  return this;
};

$.prototype.css = function(arg){
  if(Object.prototype.toString.call(arg) === '[object Array]'){
    let result = [];

    for(let i=0; i<arg.length; i++){
        let value = this.target.style[arg[i]];

        value = (value !== '') ? value : window.getComputedStyle(this.target).getPropertyValue(arg[i]);

        result.push(value);
    }

    return (result.length === 1) ? result[0] : result;
  }

  if(arguments.length === 1){
    let data = arguments[0];

    if(data === Object(data)){
      let keys = Object.keys(data);

      for(let i=0; i<keys.length; i++){
        this.target.style[keys[i]] = data[keys[i]];
      }
    }else if(typeof data === "string"){
      let value = this.target.style[data];

        value = (value !== '') ? value : window.getComputedStyle(this.target).getPropertyValue(data);

      return value;
    }

  }else if(arguments.length === 2){
    let property = arguments[0],
        value = arguments[1];

    if(typeof property === "string" && ["string", "number"].includes(typeof value)){
      this.target.style[arguments[0]] = arguments[1];
    }
  }

  return this;
};


/*
*     Prototype methods for work with elements class
* */

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

$.prototype.hasClass = function(classname){
  if(classname === undefined || typeof classname !== "string") return;

  return this.target.classList.contains(classname);
};


/*
*     Prototype methods for work with elements attributes
* */

$.prototype.attr = function(name, value){
  if(name === undefined || typeof name !== "string") return;
  if(typeof value !== "string") return;

  if(value === undefined){
    return this.target.getAttribute(name);
  }else{
    this.target.setAttribute(name, value);
  }
};

$.prototype.removeAttr = function(name){
  if(name === undefined || typeof name !== "string") return;

  this.target.removeAttribute(name);
};


/*
*     Prototype methods for events control
* */

$.prototype.ready = function(callback){
  if(!Object.is(this.target, document)) throw new TypeError('ready is not a function');
  if(callback === undefined || typeof callback !== "function") return;

  function complete(){
    document.removeEventListener('DOMContentLoaded', callback);
  }

  document.addEventListener('DOMContentLoaded', function(){
    callback();
    complete();
  });
};

$.prototype.on = function(eventType, callback){
  if(eventType === undefined || typeof eventType !== "string") return;
  if(callback === undefined || typeof callback !== "function") return;

  this.target.addEventListener(`${eventType}`, callback);
  return this;
};

$.prototype.off = function(eventType, callback){
  if(eventType === undefined || typeof eventType !== "string") return;
  if(callback === undefined || typeof callback !== "function") return;

  this.target.removeEventListener(`${eventType}`, callback);
  return this;
};


/*
*     Prototype method for loop utility
* */
$.prototype.each = function(callback){
  if(callback === undefined || typeof callback !== "function") throw new TypeError("'each' method need a callback argument to run");

  if(this.target.length){
    for(let i = 0; i < this.target.length; i++){
      callback(this.target[i]);
    }
  }else {
    callback(this.target);
  }
};
