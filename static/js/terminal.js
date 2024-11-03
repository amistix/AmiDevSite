var layer = 1;
var offsetX, offsetY;
var currentMovable;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function closeTerminal(terminal)
{
  terminal.classList.toggle("hidden");
  setTimeout(
    () => {document.body.removeChild(terminal)},
    200
  );
}

async function createTerminal(headerTitle = "Terminal", width=400, height=300, innerHTML)
{
  const template =  `
    <div class="console hidden" style="width:${width}px; height:${height}px; top:calc(${Math.random()} * (100vh - ${height}px)); left: calc(${Math.random()} * (100vw - ${width}px));">
      <div class="console-header hold-to-move">
        <div class="console-title">${headerTitle}</div>
        <div class="console-controls">
          <div class="console-minimize console-control"></div>
          <div class="console-maximize console-control"></div>
          <div onclick="closeTerminal(this.parentElement.parentElement.parentElement)" class="console-close console-control"></div>
        </div>
      </div>
      <div class="text">$</div>
    </div>
  `

  let temp = document.createElement("div");
  temp.innerHTML = template.trim();
  document.body.appendChild(temp.firstChild);
  let terminals = document.body.getElementsByClassName("console");
  const terminal = terminals[terminals.length - 1];
  setMovable(terminal.children[0]);
  setTimeout(()=>{terminal.classList.toggle("hidden");}, 10);

  const text = innerHTML ? innerHTML : await fetchFunnyPhrase();
  const terminalText = terminal.children[1];
  for (let i = 0; i < text.length; i++)
  {
    await sleep(60);
    terminalText.textContent += text[i];
  }

  return terminal;
}

function setMovable(el)
{
  el.addEventListener("mousedown",(event) => {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    currentMovable = el;
    currentMovable.parentElement.style.zIndex = ++layer;
    document.addEventListener("mousemove",moveElement, { passive: false });
  });

  el.addEventListener("mouseup",(event) => {
    currentMovable.style.cursor = "grab";
    document.removeEventListener("mousemove", moveElement, { passive: true });
  });
}

function moveElement(e)
{
  document.body.style.cursor = "grabing";
  currentMovable.parentElement.style.left = `calc(${e.pageX}px - ${offsetX}px)`;
  currentMovable.parentElement.style.top = `calc(${e.pageY}px  - ${offsetY}px)`;
}