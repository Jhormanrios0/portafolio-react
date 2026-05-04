import { gsap } from "gsap";

export function initCustomCursor() {
  const canUseCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canUseCursor) return () => {};

  document.querySelector("[data-custom-cursor-root]")?.remove();

  document.body.classList.add("has-custom-cursor");

  const root = document.createElement("div");
  root.className = "custom-cursor";
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

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let frameX = targetX;
  let frameY = targetY;
  let rafId = null;
  let visible = false;
  let currentMode = "";
  let currentLabel = "";

  gsap.set([frame, core], {
    xPercent: -50,
    yPercent: -50,
    x: targetX,
    y: targetY,
    autoAlpha: 0,
    force3D: true,
  });

  const setFrameX = gsap.quickSetter(frame, "x", "px");
  const setFrameY = gsap.quickSetter(frame, "y", "px");
  const setCoreX = gsap.quickSetter(core, "x", "px");
  const setCoreY = gsap.quickSetter(core, "y", "px");

  const render = () => {
    // Mientras más alto el número, más pegado al mouse.
    // 0.22 se siente natural sin quedar atrasado.
    const ease = 0.22;

    frameX += (targetX - frameX) * ease;
    frameY += (targetY - frameY) * ease;

    setFrameX(frameX);
    setFrameY(frameY);

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

  const setMode = ({ mode, text }) => {
    if (currentMode === mode && currentLabel === text) return;

    currentMode = mode;
    currentLabel = text;

    root.classList.toggle("is-default", mode === "default");
    root.classList.toggle("is-link", mode === "link");
    root.classList.toggle("is-project", mode === "project");
    root.classList.toggle("is-input", mode === "input");

    if (label) {
      label.textContent = text || "";
    }
  };

  const getCursorState = (target) => {
    if (!target || !(target instanceof Element)) {
      return { mode: "default", text: "" };
    }

    if (target.closest("input, textarea, select, [contenteditable='true']")) {
      return { mode: "input", text: "" };
    }

    const custom = target.closest("[data-cursor], [data-cursor-label]");
    if (custom) {
      return {
        mode: custom.getAttribute("data-cursor") || "link",
        text: custom.getAttribute("data-cursor-label") || "",
      };
    }

    if (target.closest(".project-stable-card")) {
      return { mode: "project", text: "" };
    }

    if (target.closest(".skill-card, .service-card")) {
      return { mode: "project", text: "" };
    }

    if (
      target.closest(
        "a, button, [role='button'], .menu-toggle, .theme-toggle, .floating-menu-button"
      )
    ) {
      return { mode: "link", text: "" };
    }

    return { mode: "default", text: "" };
  };

  const handlePointerMove = (event) => {
    show();

    targetX = event.clientX;
    targetY = event.clientY;

    // El punto va exacto al mouse.
    setCoreX(targetX);
    setCoreY(targetY);

    // El frame/HUD lo sigue en el RAF.
    setMode(getCursorState(event.target));
  };

  const handlePointerDown = () => {
    root.classList.add("is-down");
  };

  const handlePointerUp = () => {
    root.classList.remove("is-down");
  };

  const handleMouseLeave = () => {
    hide();
  };

  const handleMouseEnter = () => {
    show();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) hide();
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  window.addEventListener("pointerup", handlePointerUp, { passive: true });
  document.documentElement.addEventListener("mouseleave", handleMouseLeave);
  document.documentElement.addEventListener("mouseenter", handleMouseEnter);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.body.classList.remove("has-custom-cursor");

    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerdown", handlePointerDown);
    window.removeEventListener("pointerup", handlePointerUp);
    document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    document.removeEventListener("visibilitychange", handleVisibilityChange);

    root.remove();
  };
}

