"use strict"

document.addEventListener('keydown', keyDown, false)

function keyDown(e){
  if((e.ctrlKey)&&(e.keyCode == 84)&&(e.altKey)){
    createTerminal();
  }
  if((e.ctrlKey)&&(e.keyCode == 87)&&(e.altKey)){
    const terminals = document.body.getElementsByClassName("console");
    for (let i=0; i < terminals.length; i++)
    {
      closeTerminal(terminals[i]);
    }
  }
}

async function fetchFunnyPhrase()
{
  const req = await fetch("https://api.chucknorris.io/jokes/random?category=dev");
  const result = await req.json();
  return result.value;
}


function createElement(type) 
{
  const elem = document.createElement(type);
  return {
    baseElement: elem,
    css: function(key, value) {
      this.baseElement.style[key] = value;
      return this;
    },
    attr: function(key, value) {
      this.baseElement.setAttribute(key, value);
      return this;
    },
    textContent: function(value) {
      this.baseElement.textContent = value;
      return this;
    },
    toDOM: function() {
      return this.baseElement;
    }
  };
}
