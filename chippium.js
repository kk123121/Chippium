Game.fps = 60;
(function () {
 
    const chippium = document.createElement("div");
    chippium.id = "chippium";
    chippium.style = `
      position: absolute;
      top: 100px;
      left: 100px;
      width: 300px;
      background-color: #222;
      color: #0f0;
      border: 2px solid #0f0;
      border-radius: 8px;
      padding: 10px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
  
    // Create title bar with the new title "Chippium"
    const titleBar = document.createElement("div");
    titleBar.style = `
      background-color: #333;
      color: #0f0;
      padding: 5px;
      cursor: move;
      text-align: center;
      font-weight: bold;
      border-bottom: 2px solid #0f0;
    `;
    titleBar.innerText = "Chippium | made by nugget";  // Changed title here
    chippium.appendChild(titleBar);
  
    // Create a container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style = "display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;";
  
    // Add buttons with commands
    const buttons = [
      { text: "Ascend", action: ascend },
      { text: "+5 septillion Cookies", action: septitionnn},
      { text: "Infinite cookies", action: infitite },
      { text: "/1000 cookies", action: divide1000 },
      { text: "5 septillion cps", action: cookpsc },
      { text: "All Achievements", action: allach },
      { text: "make all towers free", action: unblock },
      { text: "Dragon flight", action: dragonflight },
      { text: "Frenzy", action: frenzy },
      { text: "Golden Cookie", action: goldcookie },
      { text: "Auto click (only works when mouse is over cookie)", action: autoclick },
      { text: "Devtools", action: devtools },

    ];
   



    buttons.forEach((btn) => {
      const button = document.createElement("button");
      button.innerText = btn.text;
      button.style = `
        padding: 5px;
        background-color: #222;
        border: 1px solid #0f0;
        border-radius: 4px;
        color: #0f0;
        cursor: pointer;
      `;
      button.onmouseover = () => (button.style.backgroundColor = "#0f0");
      button.onmouseout = () => (button.style.backgroundColor = "#222");
      button.onclick = btn.action;
      buttonContainer.appendChild(button);
    });
  
    chippium.appendChild(buttonContainer);
    document.body.appendChild(chippium);
  
    // Add notifications container
    const notifications = document.createElement("div");
    notifications.id = "notifications";
    notifications.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      max-width: 300px;
      z-index: 10000;
    `;
    document.body.appendChild(notifications);
  
    // Drag functionality
    let isDragging = false;
    let offsetX, offsetY;
  
    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - chippium.offsetLeft;
      offsetY = e.clientY - chippium.offsetTop;
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        chippium.style.left = `${e.clientX - offsetX}px`;
        chippium.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  

    let cookies = 0;
  

    function updateCookies(amount, multiply = false) {
      if (multiply) {
        cookies *= amount;
      } else {
        cookies += amount;
      }
      showNotification(`[+] added 5 septillion cookies!`);
    }

    function unblock() {
      showNotification("[+] made all towers free!");
      Game.ObjectsById.forEach(function(e) {
        e.basePrice = 0;
        e.refresh();
    });
    Game.storeToRebuild = 1;
    }
    
    function upgall100() {
      showNotification("[+] upgraded every tower 100 times!");
      Game.SetAllUpgrade(100);
    }

    function frenzy() {
      showNotification("[+] frenzy!");
      Game.gainBuff('frenzy', 500, 64);
    }
    function goldcookie() {
      showNotification("[+] made a golden cookie!");
      new Game.shimmer('golden');
    }

    function autoclick() {
      showNotification("[+] autoclicker!");
      setInterval(function() {
        Game.ClickCookie();
        Game.shimmers.forEach(function(shimmer) {
            if (shimmer.type == "golden") { shimmer.pop() }
        })
    }, 500);
    }

    function allach() {
      showNotification("[+] Unlocked all achievements");
      Game.SetAllAchievs(1);
    }
    function devtools() {
      showNotification("[+] devtools enabled");
      Game.OpenSesame();
    }
    function ascend() {
      showNotification("Ascended! Progress reset.");
      Game.Ascend();
    }

    function infitite() {
      showNotification("[+] Infinite (NUN cookies)]");
      Game.cookies = Infinity;
    }

    function dragonflight() {
        showNotification("[+] Dragon flight activated!");
        Game.gainBuff('dragon harvest', 500, 1111);
    }
    function divide1000() {
      showNotification("[-] divided 1000 cookies");
      Game.cookies /= 1000;
      Game.cookiesEarned /= 1000;
    }

    function cookpsc() {
      showNotification("[+] changed cps to 5 septillion");
      Game.cookiesPs = 500000000000000000000000000000;
    }

    function septitionnn() {
      showNotification("[+] added 5 septillion cookies!");
      Game.Earn(500000000000000000000000000000); 
    }
  
    function showNotification(message) {
      const notification = document.createElement("div");
      notification.innerText = message;
      notification.style = `
        background-color: #222;
        color: #0f0;
        border: 1px solid #0f0;
        border-radius: 5px;
        padding: 10px;
        margin-top: 5px;
        opacity: 1;
        transition: opacity 0.5s ease, transform 0.5s ease;
      `;
      notifications.appendChild(notification);
  
      setTimeout(() => {
        notification.style.opacity = 0;
        notification.style.transform = "translateY(-10px)";
        setTimeout(() => notification.remove(), 500);
      }, 2000);
    }
})();
