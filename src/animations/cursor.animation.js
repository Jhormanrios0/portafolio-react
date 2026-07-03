import { gsap } from "gsap";

const CLICKABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[role='button']",
  "summary",
  ".menu-fab",
  ".menu-panel__link",
  ".menu-panel__close",
  ".project-stable-card",
  ".project-card",
  ".career-sticky-card",
  ".service-card",
  ".skill-card",
  ".contact-card",
  "[data-cursor]",
  "[data-cursor-label]",
  "[data-cursor-fit]",
  "[data-cursor-magnetic]",
].join(",");

const INPUT_SELECTOR =
  "input, textarea, select, [contenteditable='true']";

const DISABLED_SELECTOR =
  "[disabled], [aria-disabled='true'], .is-disabled, [data-cursor-fit='false']";

function canUseCursor() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getClickableTarget(target) {
  if (!target || !(target instanceof Element)) return null;
  if (target.closest(INPUT_SELECTOR)) return null;

  const clickable = target.closest(CLICKABLE_SELECTOR);

  if (!clickable) return null;
  if (clickable.matches(DISABLED_SELECTOR)) return null;
  if (clickable.closest("[data-custom-cursor-root]")) return null;

  return clickable;
}

function getTargetRadius(target) {
  const computed = window.getComputedStyle(target);
  const radius = Number.parseFloat(computed.borderRadius);

  if (Number.isNaN(radius) || radius <= 0) return 18;

  return Math.min(Math.max(radius, 12), 36);
}

function getCursorState(target) {
  if (!target || !(target instanceof Element)) {
    return {
      mode: "default",
      text: "",
      fitTarget: null,
    };
  }

  if (target.closest(INPUT_SELECTOR)) {
    return {
      mode: "input",
      text: "",
      fitTarget: null,
    };
  }

  const fitTarget = getClickableTarget(target);

  if (!fitTarget) {
    return {
      mode: "default",
      text: "",
      fitTarget: null,
    };
  }

  const customMode = fitTarget.getAttribute("data-cursor");
  const customLabel = fitTarget.getAttribute("data-cursor-label");

  if (customMode || customLabel) {
    return {
      mode: customMode || "link",
      text: customLabel || "",
      fitTarget,
    };
  }

  if (fitTarget.matches(".project-stable-card, .project-card")) {
    return {
      mode: "project",
      text: fitTarget.getAttribute("aria-label") || "",
      fitTarget,
    };
  }

  return {
    mode: "link",
    text: "",
    fitTarget,
  };
}

export function initCustomCursor() {
  if (!canUseCursor()) return () => {};

  document.querySelector("[data-custom-cursor-root]")?.remove();

  document.body.classList.add("has-custom-cursor");

  const root = document.createElement("div");
  root.className = "custom-cursor is-default";
  root.setAttribute("data-custom-cursor-root", "");

  root.innerHTML = `
    <div class="custom-cursor__frame" aria-hidden="true">
      <span class="custom-cursor__corner custom-cursor__corner--tl"></span>
      <span class="custom-cursor__corner custom-cursor__corner--tr"></span>
      <span class="custom-cursor__corner custom-cursor__corner--bl"></span>
      <span class="custom-cursor__corner custom-cursor__corner--br"></span>
      <span class="custom-cursor__axis custom-cursor__axis--x"></span>
      <span class="custom-cursor__axis custom-cursor__axis--y"></span>
      <span class="custom-cursor__scan"></span>
      <span class="custom-cursor__label">VER</span>
      <span class="custom-cursor__arrow">↗</span>
    </div>

    <div class="custom-cursor__core" aria-hidden="true">
      <span class="custom-cursor__core-dot"></span>
      <span class="custom-cursor__core-pulse"></span>
    </div>
  `;

  document.body.appendChild(root);

  const frame = root.querySelector(".custom-cursor__frame");
  const core = root.querySelector(".custom-cursor__core");
  const label = root.querySelector(".custom-cursor__label");

  if (!frame || !core) return () => {};

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let frameX = mouseX;
  let frameY = mouseY;

  let activeFitTarget = null;
  let rafId = null;
  let visible = false;
  let currentMode = "";
  let currentLabel = "";
  let isDown = false;

  root.style.setProperty("--cursor-fit-width", "42px");
  root.style.setProperty("--cursor-fit-height", "42px");
  root.style.setProperty("--cursor-fit-radius", "999px");

  gsap.set([frame, core], {
    xPercent: -50,
    yPercent: -50,
    x: mouseX,
    y: mouseY,
    autoAlpha: 0,
    force3D: true,
  });

  const setFrameX = gsap.quickSetter(frame, "x", "px");
  const setFrameY = gsap.quickSetter(frame, "y", "px");
  const setCoreX = gsap.quickSetter(core, "x", "px");
  const setCoreY = gsap.quickSetter(core, "y", "px");

  const updateFitVars = () => {
    if (!activeFitTarget || !document.body.contains(activeFitTarget)) {
      activeFitTarget = null;
      root.classList.remove("is-fit");
      return {
        x: mouseX,
        y: mouseY,
      };
    }

    const rect = activeFitTarget.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      root.classList.remove("is-fit");
      return {
        x: mouseX,
        y: mouseY,
      };
    }

    const paddingX = Number(
      activeFitTarget.dataset.cursorPaddingX ||
        activeFitTarget.dataset.cursorFrameX ||
        10
    );

    const paddingY = Number(
      activeFitTarget.dataset.cursorPaddingY ||
        activeFitTarget.dataset.cursorFrameY ||
        8
    );

    const magnetic = Number(activeFitTarget.dataset.cursorMagnetic || 0.025);

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (mouseX - centerX) * magnetic;
    const offsetY = (mouseY - centerY) * magnetic;

    const width = Math.round(rect.width + paddingX * 2);
    const height = Math.round(rect.height + paddingY * 2);
    const radius = Math.round(getTargetRadius(activeFitTarget) + paddingY);

    root.style.setProperty("--cursor-fit-width", `${width}px`);
    root.style.setProperty("--cursor-fit-height", `${height}px`);
    root.style.setProperty("--cursor-fit-radius", `${radius}px`);

    root.classList.add("is-fit");

    return {
      x: centerX + offsetX,
      y: centerY + offsetY,
    };
  };

  const render = () => {
    const targetFramePosition = updateFitVars();

    const ease = activeFitTarget ? 0.42 : 0.34;

    frameX += (targetFramePosition.x - frameX) * ease;
    frameY += (targetFramePosition.y - frameY) * ease;

    setFrameX(frameX);
    setFrameY(frameY);

    setCoreX(mouseX);
    setCoreY(mouseY);

    rafId = window.requestAnimationFrame(render);
  };

  rafId = window.requestAnimationFrame(render);

  const show = () => {
    if (visible) return;

    visible = true;

    gsap.to([frame, core], {
      autoAlpha: 1,
      duration: 0.14,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const hide = () => {
    visible = false;

    gsap.to([frame, core], {
      autoAlpha: 0,
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const setMode = ({ mode, text, fitTarget }) => {
    const nextText = text || "";

    activeFitTarget = fitTarget || null;

    if (currentMode === mode && currentLabel === nextText) return;

    currentMode = mode;
    currentLabel = nextText;

    root.classList.toggle("is-default", mode === "default");
    root.classList.toggle("is-link", mode === "link");
    root.classList.toggle("is-project", mode === "project");
    root.classList.toggle("is-input", mode === "input");

    root.classList.toggle("is-down", isDown);

    if (!activeFitTarget) {
      root.classList.remove("is-fit");
      root.style.setProperty("--cursor-fit-width", "42px");
      root.style.setProperty("--cursor-fit-height", "42px");
      root.style.setProperty("--cursor-fit-radius", "999px");
    }

    if (label) {
      label.textContent = nextText;
    }
  };

  const onPointerMove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    show();
    setMode(getCursorState(event.target));
  };

  const onPointerDown = () => {
    isDown = true;
    root.classList.add("is-down");

    gsap.to(core, {
      scale: 0.82,
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const onPointerUp = () => {
    isDown = false;
    root.classList.remove("is-down");

    gsap.to(core, {
      scale: 1,
      duration: 0.18,
      ease: "back.out(1.8)",
      overwrite: true,
    });
  };

  const onBlur = () => {
    hide();
  };

  const onFocus = () => {
    show();
  };

  const onLeave = () => {
    hide();
  };

  const onEnter = () => {
    show();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointerleave", onLeave, { passive: true });
  window.addEventListener("pointerenter", onEnter, { passive: true });
  window.addEventListener("blur", onBlur);
  window.addEventListener("focus", onFocus);

  return () => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("pointerenter", onEnter);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("focus", onFocus);

    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    document.body.classList.remove("has-custom-cursor");
    root.remove();
  };
}


