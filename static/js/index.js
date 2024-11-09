"use strict"

const siteConfig = fetchSiteConfig();
var currentBgIndex = 1;

document.addEventListener('keydown', keyDown, false)

function keyDown(e){
  if((e.ctrlKey)&&(e.keyCode == 84)&&(e.altKey)){
    new Terminal();
  }
  else if((e.ctrlKey)&&(e.keyCode == 87)&&(e.altKey)){
    for (let i=0; i < terminals.length; i++)
    {
      terminals[i].closeTerminal();
    }
    terminals.length = 0;
  }

  else if((e.ctrlKey)&&(e.keyCode == 66)&&(e.altKey)){
    siteConfig.then(config => {
      document.body.setAttribute(
        "style", `background-image: url("${config.wallpapers[++currentBgIndex % config.wallpapers.length]}")`
      );
    });
  }
}

async function fetchSiteConfig() {
  const req = await fetch("api/json/site.config.json");
  const result = await req.json();
  return result;
}

async function fetchFunnyPhrase()
{
  const config = await siteConfig;

  const req = await fetch(await config.pages.CHUCK_NORRIS_JOKES);
  const result = await req.json();
  return result.value;
}

async function fetchRepos()
{
  const config = await siteConfig;

  const req = await fetch(config.pages.API_GITHUB_AMISTIX,{
    headers:{
      Accept: "application/vnd.github.v3+json",
    }
  });
  const result = await req.json();
  return result.items;
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
