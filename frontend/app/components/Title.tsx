"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function RollingTitle() {
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const txt = textRef.current;

    if (!stage || !txt) return; // перевірка на null

    const style = getComputedStyle(document.body);
    const weightInit = parseInt(style.getPropertyValue("--fw")) || 700;
    const weightTarget = 400;
    const weightDiff = weightInit - weightTarget;

    const stretchInit = parseInt(style.getPropertyValue("--fs")) || 100;
    const stretchTarget = 80;
    const stretchDiff = stretchInit - stretchTarget;

    const maxYScale = 2.5;
    const body = document.body;

    const split = new SplitText(txt, {
      type: "chars",
      charsClass: "char",
      position: "relative",
    });

    const chars = split.chars;
    const numChars = chars.length;
    let isMouseDown = false;
    let mouseInitialY = 0;
    let mouseFinalY = 0;
    let distY = 0;
    let charIndexSelected = 0;
    const charH = txt.offsetHeight;
    const elasticDropOff = 0.8;
    let dragYScale = 0;

    function calcDist() {
      const maxYDragDist = charH * (maxYScale - 1);
      distY = mouseInitialY - mouseFinalY;
      dragYScale = distY / maxYDragDist;

      if (dragYScale > maxYScale - 1) dragYScale = maxYScale - 1;
      else if (dragYScale < -0.5) dragYScale = -0.5;
    }

    function calcFracDispersion(index: number) {
      const dispersion =
        1 - Math.abs(index - charIndexSelected) / (numChars * elasticDropOff);
      return dispersion * dragYScale;
    }

    function setFontDragDimensions() {
      gsap.to(chars, {
        y: (i) => calcFracDispersion(i) * -50,
        fontWeight: (i) => weightInit - calcFracDispersion(i) * weightDiff,
        fontStretch: (i) => stretchInit - calcFracDispersion(i) * stretchDiff,
        scaleY: (i) => Math.max(0.5, 1 + calcFracDispersion(i)),
        ease: "power4",
        duration: 0.6,
      });
    }

    function snapBackText() {
      gsap.to(chars, {
        y: 0,
        fontWeight: weightInit,
        fontStretch: stretchInit,
        scale: 1,
        ease: "elastic(0.35, 0.1)",
        duration: 1,
        stagger: { each: 0.02, from: charIndexSelected },
      });
    }

    function initEvents() {
      body.onmouseup = (e) => {
        if (isMouseDown) {
          mouseFinalY = e.clientY;
          isMouseDown = false;
          snapBackText();
          body.classList.remove("grab");
        }
      };

      body.onmousemove = (e) => {
        if (isMouseDown) {
          mouseFinalY = e.clientY;
          calcDist();
          setFontDragDimensions();
        }
      };

      chars.forEach((char, index) => {
        char.addEventListener("mousedown", (e) => {
            const ev = e as MouseEvent;
            mouseInitialY = ev.clientY;
            charIndexSelected = index;
            isMouseDown = true;
            body.classList.add("grab");
        });
      });
    }

    function animInTxt() {
      const rect = chars[0].getBoundingClientRect();

      gsap.from(chars, {
        y: -1 * (rect.y + charH + 500),
        fontWeight: weightTarget,
        fontStretch: stretchTarget,
        scaleY: 2,
        ease: "elastic(0.2, 0.1)",
        duration: 1.5,
        delay: 0.5,
        stagger: { each: 0.05, from: "random" },
        onComplete: initEvents,
      });
    }

    gsap.set(stage, { autoAlpha: 1 });
    gsap.set(chars, { transformOrigin: "center bottom" });

    animInTxt();
  }, []);

  return (
    <div className="stage" ref={stageRef}>
      <div className="content">
        <h1
          ref={textRef}
          className="txt text-white"
          style={{
            WebkitTextStroke: "5px #a855f7",
            textShadow: "0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #a855f7",
          }}
        >
          My notes
        </h1>
      </div>
    </div>
  );
}
