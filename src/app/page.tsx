"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";

import styles from "../styles/page.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface LottieScrollTriggerVars {
  trigger?: string | Element;
  end?: string;
  scrub?: number | boolean;
  markers?: boolean;
  speed?: "slow" | "medium" | "fast";
  renderer?: "svg" | "canvas" | "html";
  target: string | Element;
  path: string;
  rendererSettings?: object;
  start?: string;
  endTrigger?: string | Element;
  onLeave?: () => void;
  onEnterBack?: () => void;
  [key: string]: unknown;
}

interface LottieAnimation {
  totalFrames: number;
  frameTween?: gsap.core.Tween;
  goToAndStop: (frame: number, isFrame: boolean) => void;
  addEventListener: (event: string, callback: () => void) => void;
  destroy?: () => void;
}

function LottieScrollTrigger(vars: LottieScrollTriggerVars): LottieAnimation {
  let playhead = { frame: 0 };

  if (window.innerWidth <= 768) {
    playhead = { frame: -1 };
  }
  const target = gsap.utils.toArray(vars.target)[0] as Element;
  const speeds: Record<string, string> = {
    slow: "+=2000",
    medium: "+=1000",
    fast: "+=500",
  };
  const st: Record<string, unknown> = {
    trigger: vars.trigger || ".trigger",
    end: speeds[vars.speed as string] || "+=1000",
    scrub: 1,
    markers: false,
  };

  const animation = lottie.loadAnimation({
    container: target,
    renderer: vars.renderer || "svg",
    loop: false,
    autoplay: false,
    path: vars.path,
    rendererSettings: vars.rendererSettings || {
      preserveAspectRatio: "xMidYMid meet",
    },
  }) as LottieAnimation;

  // Copy all vars to st
  for (const p in vars) {
    st[p] = vars[p];
  }

  animation.addEventListener("DOMLoaded", function () {
    animation.frameTween = gsap.to(playhead, {
      frame: animation.totalFrames - 1,
      ease: "none",
      onUpdate: () => animation.goToAndStop(playhead.frame, true),
      scrollTrigger: {
        ...st,
        onLeave: () => {
          gsap.set(target, { height: "100vh" });
        },
        onEnterBack: () => {
          if (window.innerWidth >= 768) {
            gsap.set(target, { height: "auto" });
          }
        },
        onLeaveBack: () => {
          console.log("Scrolling back past start");
        },
      },
    });
  });

  return animation;
}

export default function Home() {
  const animationRef = useRef<HTMLDivElement>(null);
  const endLottieRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (animationRef.current && endLottieRef.current) {
      const lottieAnimation = LottieScrollTrigger({
        trigger: animationRef.current,
        start: "top center",
        endTrigger: endLottieRef.current,
        end: `bottom center+=${animationRef.current.offsetHeight}`,
        renderer: "svg",
        target: animationRef.current,
        path: "./harmony-xl.mp4.lottie.json",
        scrub: 2,
      });

      return () => {
        if (lottieAnimation && lottieAnimation.destroy) {
          lottieAnimation.destroy();
        }
      };
    }
  }, []);

  return (
    <>
      <nav>
        <div className={styles.logo}>
          <a href="#">Rafael</a>
        </div>
        <div className="links">
          <a href="#">Home</a>
          <a href="#">Work</a>
          <a href="#">Expertise</a>
          <a href="#">Agency</a>
          <a href="#">Jobs</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <section className={styles.lottieContainer}>
        <div
          ref={animationRef}
          className={styles.animation}
          style={{
            transition: "height 0.3s ease",
          }}
        />
      </section>

      <section className={styles.gradient}></section>

      <section className={styles.websiteContent}>
        <div ref={endLottieRef} className={styles.endLottie}></div>

        <h1>Your website content goes here</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus magnam
          est, fuga earum repudiandae aliquid corrupti repellendus nesciunt
          culpa ipsam possimus cupiditate veritatis minima, ratione itaque.
          Aperiam, quidem tempore, tenetur et, nam doloremque repudiandae aut
          blanditiis nihil nemo magnam?
        </p>
      </section>
    </>
  );
}
