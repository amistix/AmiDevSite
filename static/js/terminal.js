var layer = 1;
var offsetX, offsetY;
var currentMovable;
const sleep = ms => new Promise(r => setTimeout(r, ms));
var terminals = [];

class Terminal
{
  element;
  width;
  height;
  innerContent;

  template = `
    <div class="console hidden" style="width:{width}px; height:{height}px; top:calc(${Math.random()} * (100vh - {height}px)); left: calc(${Math.random()} * (100vw - {width}px));">
      <div class="console-header hold-to-move">
        <div class="console-title">Terminal</div>
        <div class="console-controls">
          <div class="console-minimize console-control"></div>
          <div class="console-maximize console-control"></div>
          <div class="console-close console-control"></div>
        </div>
      </div>
      <div class="text"></div>
    </div>
  `;

  constructor(width=400, height=300, innerContent)
  {
    this.width = width;
    this.height = height;
    this.innerContent = innerContent;

    this.template = this.template.replaceAll("{width}", `${this.width}`);
    this.template = this.template.replaceAll("{height}", `${this.height}`);

    this.createTerminal();
    terminals.push(this);
  }

  async createTerminal()
  {
    let temp = document.createElement("div");
    temp.innerHTML = this.template.trim();

    this.element = temp.firstChild;

    const closeButton = this.element.getElementsByClassName("console-close")[0];
    closeButton.addEventListener("click", async () => {await this.closeTerminal()});

    document.body.appendChild(this.element);

    setMovable(this.element.children[0]);
    setTimeout(() => {this.element.classList.toggle("hidden")}, 10);

    const text = this.innerContent ? this.innerContent : await fetchFunnyPhrase();
    const textHolder = this.element.children[1];
    for (let i=0; i < text.length; i++)
    {
      if (text[i] != " ")
      {
        await sleep(30);
      }
      textHolder.textContent += text[i];
    }

    return this.element;
  }

  async closeTerminal()
  {
    this.element.classList.toggle("hidden");
    await sleep(200);
    document.body.removeChild(this.element);
    terminals.splice(terminals.indexOf(this),1);
  }
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
