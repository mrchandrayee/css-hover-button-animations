const animations = [
  {
    number: "ANIMATION 03",
    title: "Liquid Morph",
    className: "btn-liquid",
    code: `.btn-liquid {
  border-radius: 10px;
}
.btn-liquid:hover {
  background: #00e5ff;
  color: #000;
  border-radius: 50% 20% / 10% 40%;
  animation: morph 1.5s ease-in-out infinite alternate;
}
@keyframes morph {
  0% {
    border-radius: 50% 20% / 10% 40%;
  }
  100% {
    border-radius: 20% 50% / 40% 10%;
  }
}`
  },
  {
    number: "ANIMATION 04",
    title: "3D Layer Drop",
    className: "btn-3d",
    code: `.btn-3d {
  background: #ff4757;
  border-radius: 0;
  box-shadow: 7px 7px 0 #2f3542;
  transform: translate(0,0);
}
.btn-3d:hover {
  box-shadow: 0 0 0 #2f3542;
  transform: translate(7px,7px);
}`
  },
  {
    number: "ANIMATION 05",
    title: "Magnetic Center Reveal",
    className: "btn-center",
    code: `.btn-center {
  border-radius: 30px;
}
.btn-center::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: #2ed573;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  transition: width .65s ease, height .65s ease;
  z-index: -1;
}
.btn-center:hover::before {
  width: 400px;
  height: 400px;
}`
  },
  {
    number: "ANIMATION 06",
    title: "Neon Pulse Glow",
    className: "btn-neon",
    code: `.btn-neon {
  background: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  border-radius: 8px;
}
.btn-neon:hover {
  background: #00ff00;
  color: #000;
  box-shadow: 0 0 10px #00ff00,
              0 0 30px #00ff00,
              0 0 60px #00ff00;
  text-shadow: 0 0 5px rgba(0,0,0,.5);
}`
  },
  {
    number: "ANIMATION 07",
    title: "Diagonal Slicer",
    className: "btn-slice",
    code: `.btn-slice {
  border-radius: 0;
}
.btn-slice::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #ffa502;
  transform-origin: bottom left;
  transform: skewX(-45deg);
  transition: transform .5s cubic-bezier(.86,0,.07,1);
  z-index: -1;
}
.btn-slice:hover::after {
  transform: skewX(-45deg) translateX(150%);
}`
  },
  {
    number: "ANIMATION 08",
    title: "Text Swap",
    className: "btn-swap",
    code: `.btn-swap {
  overflow: hidden;
}
.btn-swap span {
  display: inline-block;
  transition: transform .4s cubic-bezier(.76,0,.24,1);
}
.btn-swap::before {
  content: attr(data-text);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7f50;
  transition: transform .4s cubic-bezier(.76,0,.24,1);
}
.btn-swap:hover span {
  transform: translateY(-150%);
}
.btn-swap:hover::before {
  transform: translateY(-100%);
}`
  },
  {
    number: "ANIMATION 09",
    title: "Border Draw",
    className: "btn-draw",
    code: `.btn-draw {
  background: transparent;
  border-radius: 0;
}
.btn-draw::before, .btn-draw::after {
  content: "";
  position: absolute;
  width: 0; height: 0;
  border: 2px solid transparent;
  pointer-events: none;
}
.btn-draw:hover::before {
  border-top-color: #00e5ff;
  border-right-color: #00e5ff;
  transition: width .25s ease-out,
              height .25s ease-out .25s;
  width: 100%; height: 100%;
}
.btn-draw:hover::after {
  border-bottom-color: #00e5ff;
  border-left-color: #00e5ff;
  transition: width .25s ease-out .25s,
              height .25s ease-out .5s;
  width: 100%; height: 100%;
}`
  },
  {
    number: "ANIMATION 10",
    title: "Shifting Gradient",
    className: "btn-gradient",
    code: `.btn-gradient {
  background: linear-gradient(90deg,
    #ff9a9e, #fecfef, #ff9a9e, #fecfef);
  background-size: 300% 100%;
  color: #000;
  border-radius: 30px;
  transition: all .5s ease;
}
.btn-gradient:hover {
  background-position: 100% 0;
  box-shadow: 0 4px 20px rgba(255,154,158,.6);
  color: #333;
}`
  }
];

const title = document.getElementById("animationTitle");
const number = document.getElementById("animationNumber");
const button = document.getElementById("demoButton");
const codeOutput = document.getElementById("codeOutput");
const dots = document.getElementById("dots");
const copyButton = document.getElementById("copyButton");
let activeIndex = 0;

function render(index) {
  activeIndex = (index + animations.length) % animations.length;
  const item = animations[activeIndex];

  title.textContent = item.title;
  number.textContent = item.number;
  codeOutput.textContent = item.code;

  button.className = `demo-button ${item.className}`;
  button.querySelector(".button-label").textContent = "Hover Me";
  button.querySelector(".button-alt").textContent = "Nice!";

  dots.replaceChildren();
  animations.forEach((animation, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `dot${i === activeIndex ? " active" : ""}`;
    dot.setAttribute("aria-label", `Show ${animation.title}`);
    dot.setAttribute("aria-current", i === activeIndex ? "true" : "false");
    dot.addEventListener("click", () => render(i));
    dots.append(dot);
  });
}

document.getElementById("previousButton").addEventListener("click", () => render(activeIndex - 1));
document.getElementById("nextButton").addEventListener("click", () => render(activeIndex + 1));

copyButton.addEventListener("click", async () => {
  const text = animations[activeIndex].code;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied!";
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    copyButton.textContent = "Copied!";
  }
  window.setTimeout(() => { copyButton.textContent = "Copy CSS"; }, 1400);
});

render(0);
