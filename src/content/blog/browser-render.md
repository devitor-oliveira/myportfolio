---
title: Browser and Renderization
topic: web concepts
description: Article to practice english describing the basics about browser rendering and how browsers treat HTML, CSS and JavaScript
date: 2025-04-11
tags:
  - conceitos-basicos
  - navegador
  - JavaScript
  - DOM
  - HTML
  - JS
  - CSS
  - logica-de-programacao
author: Vitor Hugo
---

## Browser & Rendering

There are probably a billion articles discussing these topics, but I just want to remember the topic and practice my English, so I don’t care.

Initially, my idea of writing came after I watched this video: [Augusto Galego — Como Browsers Funcionam?](https://www.youtube.com/watch?v=fv_B3FTXwxo&t=1288s) | How do Browsers Work?

This video reminded me of how complex basic software is and that’s why I like I.T. In general, every part of technology has its own complexity that someone dedicated a lot to build. That said, this also reminds me that I knew something about browsers, and how they render.

So be it, don’t expect the same quality as Galego's video.

### Start

From the beginning, most of the time, we just open the browser and go to YouTube, spending a hundred hours in shorts, but in that simple action, the browser makes a dozen requests to the DNS server, sending and receiving data.

So, what happens when a web browser receives that data from any website? Now, we're taking the part about rendering engine and front-end related stuff.

**A webpage is made of three parts, DOM, CSSOM, and JavaScript.**

- **DOM — Document Object Model:** It's a node tree made from an HTML file containing information about relationships between tags.
- **CSSOM — CSS Object Model:** CSS is parsed to CSSOM that will be combined with DOM and transformed into Render Tree.
- **JavaScript** — The code is parsed and interpreted then sent to a JS Engine like V8 to compile.

An important mention is that every time data (which could be style, variables displayed dynamically, or HTML tags) changes, the browser renders everything over again.

**The process occurs like this:**

PARSE HTML INTO NODE TREE -> PARSE CSS TO CSSOM -> COMBINE INTO RENDER TREE -> EXECUTE JAVASCRIPT

Note that Javascript is render-blocking, every time the rendering engine identifies a JS code it stops the render and executes JS code. That’s why we always want to work with JS after the browser renders HTML and CSS because with JavaScript we can remove, add, change HTML tags, and modify CSS styles.

_Imagine changing a style or removing a tag before it renders on the screen._

**There are alternatives like defer and async to stop this behavior, respectively:**

**Defer** -> Execute after all HTML and CSS are rendered.

**Async** -> Execute when is possible.

### **Conclusion**

That’s the basics of browser rendering. I definitely wanted to give more detailed information but I lost my old sources and this article is taking more time than I expected.

So, I would appreciate any corrections or suggestions about information or my English. Thank you for reading.
