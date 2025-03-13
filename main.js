document.addEventListener("DOMContentLoaded", function () {
  // --- Neon Glow Effect Covering Entire Background ---
  const neonContainer = document.getElementById("neon-container");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  // Curated modern neon colors
  const glowColors = ["#00d084", "#3498db", "#8e44ad", "#f39c12"];
  let glowIndex = 0;
  
  function updateNeonBackground() {
    // Use a radial gradient centered at the mouse with a smooth cutoff
    neonContainer.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, ${glowColors[glowIndex]}, transparent 70%)`;
  }
  updateNeonBackground();
  
  document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    updateNeonBackground();
  });
  
  // Cycle through glow colors every 4 seconds.
  setInterval(() => {
    glowIndex = (glowIndex + 1) % glowColors.length;
    updateNeonBackground();
  }, 4000);
  
  // --- Elements & Variables for UI and Physics ---
  const profilePic = document.querySelector(".profile-photo");
  const aboutPopup = document.querySelector(".about-popup");
  const aboutLink = document.querySelector(".about-link");
  const contactLink = document.querySelector(".contact-link");
  const socialLinks = document.querySelector(".social-links");
  const footer = document.querySelector(".footer");
  const popup = document.querySelector(".social-popup");
  const popupContent = document.querySelector(".popup-social-links");
  const dimmedOverlay = document.querySelector(".dimmed");
  const adminBtn = document.querySelector(".admin-btn");
  const gravityBtn = document.querySelector(".gravity-btn");
  const resetBtn = document.querySelector(".reset-btn");
  const introText = document.querySelector(".intro-text");
  const balls = [];
  const quoteContainer = document.getElementById("quote-container");
  
  // Physics parameters.
  const GRAVITY = 0.3;
  const RESTITUTION = 0.8;
  
  // Adjust quote container height so falling quotes stop above the footer.
  function updateQuoteContainerHeight() {
    quoteContainer.style.height = (window.innerHeight - footer.offsetHeight) + "px";
  }
  updateQuoteContainerHeight();
  window.addEventListener("resize", updateQuoteContainerHeight);
  
  let quotesStarted = false;
  let quoteStartTime = Date.now();
  
  // --- Popup Controls ---
  profilePic.addEventListener("click", () => {
    aboutPopup.style.display = "flex";
    dimmedOverlay.style.display = "block";
    profilePic.classList.add("enlarged");
    introText.classList.add("hidden");
  });
  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    aboutPopup.style.display = "flex";
    dimmedOverlay.style.display = "block";
    profilePic.classList.add("enlarged");
    introText.classList.add("hidden");
  });
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    socialLinks.classList.add("hidden");
    popup.style.display = "flex";
    dimmedOverlay.style.display = "block";
    popupContent.innerHTML = socialLinks.innerHTML;
  });
  dimmedOverlay.addEventListener("click", () => {
    aboutPopup.style.display = "none";
    popup.style.display = "none";
    dimmedOverlay.style.display = "none";
    profilePic.classList.remove("enlarged");
    introText.classList.remove("hidden");
    socialLinks.classList.remove("hidden");
  });
  adminBtn.addEventListener("click", () => {
    const password = prompt("Enter password:");
    if (password === "mark2005") {
      window.location.href = "admin.html";
    } else {
      alert("Denied.");
    }
  });
  
  // --- Ball Physics and Collision ---
  gravityBtn.addEventListener("click", () => {
    dropBall();
    resetBtn.style.display = "block";
    if (!quotesStarted) {
      startFallingQuotes();
      quotesStarted = true;
    }
  });
  resetBtn.addEventListener("click", () => {
    resetBalls();
    resetBtn.style.display = "none";
  });
  
  function dropBall() {
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.backgroundColor = getRandomColor();
    const diameter = Math.random() * 30 + 40; // Random diameter between 40 and 70px.
    ball.style.width = diameter + "px";
    ball.style.height = diameter + "px";
    ball.style.left = Math.random() * (window.innerWidth - diameter) + "px";
    ball.style.top = "0px";
    ball.radius = diameter / 2;
    ball.mass = Math.pow(ball.radius, 2);
    ball.velocityX = Math.random() * 2 - 1;
    ball.velocityY = Math.random() * 4 + 1;
    document.body.appendChild(ball);
    balls.push(ball);
  }
  
  function resetBalls() {
    balls.forEach(ball => ball.remove());
    balls.length = 0;
  }
  
  function getRandomColor() {
    const letters = "89ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  
  // --- Falling Quotes ---
  function startFallingQuotes() {
    setInterval(() => {
      createFallingQuote();
    }, 10000);
    updateQuotes();
  }
  function createFallingQuote() {
    const quotes = [
      "Life isn’t about what you know, It’s about what you’re able to figure out.",
      "The best time to plant a tree is 20 years ago, the second best time is today.",
      "The rich get richer because the poor see every opportunity as a scam",
      "Money is not the key to happiness, it is the key to pursuing opportunities.",
      "Cold water feels warm when your hands are freezing.",
      "Regret is proof you cared. But growth is proof you learned."
    ];
    const quoteText = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElem = document.createElement("div");
    quoteElem.className = "falling-quote";
    quoteElem.innerText = quoteText;
    const initLeft = Math.random() * (window.innerWidth - 300);
    quoteElem.dataset.initialLeft = initLeft;
    quoteElem.dataset.amp = Math.random() * 20 + 10;
    quoteElem.dataset.phase = Math.random() * 2 * Math.PI;
    quoteElem.style.left = initLeft + "px";
    quoteElem.style.top = "-50px";
    quoteElem.style.animation = "fall 20s linear forwards";
    quoteContainer.appendChild(quoteElem);
    setTimeout(() => {
      if (quoteElem.parentElement) quoteElem.parentElement.removeChild(quoteElem);
    }, 21000);
  }
  function updateQuotes() {
    const now = Date.now();
    const quotes = document.querySelectorAll(".falling-quote");
    quotes.forEach(quote => {
      const initLeft = parseFloat(quote.dataset.initialLeft) || 0;
      const amp = parseFloat(quote.dataset.amp) || 0;
      const phase = parseFloat(quote.dataset.phase) || 0;
      const t = (now - quoteStartTime) / 1000;
      const offset = amp * Math.sin(t + phase);
      quote.style.left = (initLeft + offset) + "px";
    });
    requestAnimationFrame(updateQuotes);
  }
  
  // --- Update Balls & Handle Collisions ---
  function updateBalls() {
    balls.forEach(ball => {
      ball.velocityY += GRAVITY;
      
      let currentTop = parseFloat(ball.style.top);
      let currentLeft = parseFloat(ball.style.left);
      let newTop = currentTop + ball.velocityY;
      let newLeft = currentLeft + ball.velocityX;
      
      if (newLeft <= 0) {
        newLeft = 0;
        ball.velocityX = -ball.velocityX * RESTITUTION;
      }
      if (newLeft + ball.radius * 2 >= window.innerWidth) {
        newLeft = window.innerWidth - ball.radius * 2;
        ball.velocityX = -ball.velocityX * RESTITUTION;
      }
      
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      if (newTop + ball.radius * 2 >= footerTop) {
        newTop = footerTop - ball.radius * 2;
        ball.velocityY = -ball.velocityY * RESTITUTION;
        ball.velocityX *= RESTITUTION;
      }
      
      ball.style.top = newTop + "px";
      ball.style.left = newLeft + "px";
    });
    
    handleBallCollisions();
    handleBallQuoteCollisions();
    
    requestAnimationFrame(updateBalls);
  }
  
  function handleBallCollisions() {
    for (let i = 0; i < balls.length; i++) {
      const ballA = balls[i];
      const xA = parseFloat(ballA.style.left) + ballA.radius;
      const yA = parseFloat(ballA.style.top) + ballA.radius;
      for (let j = i + 1; j < balls.length; j++) {
        const ballB = balls[j];
        const xB = parseFloat(ballB.style.left) + ballB.radius;
        const yB = parseFloat(ballB.style.top) + ballB.radius;
        const dx = xB - xA;
        const dy = yB - yA;
        const dist = Math.hypot(dx, dy);
        if (dist < ballA.radius + ballB.radius && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const tx = -ny;
          const ty = nx;
          
          const vA_n = ballA.velocityX * nx + ballA.velocityY * ny;
          const vA_t = ballA.velocityX * tx + ballA.velocityY * ty;
          const vB_n = ballB.velocityX * nx + ballB.velocityY * ny;
          const vB_t = ballB.velocityX * tx + ballB.velocityY * ty;
          
          const vA_n_after = (vA_n * (ballA.mass - ballB.mass) + 2 * ballB.mass * vB_n) / (ballA.mass + ballB.mass);
          const vB_n_after = (vB_n * (ballB.mass - ballA.mass) + 2 * ballA.mass * vA_n) / (ballA.mass + ballB.mass);
          
          ballA.velocityX = vA_n_after * nx + vA_t * tx;
          ballA.velocityY = vA_n_after * ny + vA_t * ty;
          ballB.velocityX = vB_n_after * nx + vB_t * tx;
          ballB.velocityY = vB_n_after * ny + vB_t * ty;
          
          const overlap = ballA.radius + ballB.radius - dist;
          const separationX = nx * (overlap / 2);
          const separationY = ny * (overlap / 2);
          ballA.style.left = (parseFloat(ballA.style.left) - separationX) + "px";
          ballA.style.top = (parseFloat(ballA.style.top) - separationY) + "px";
          ballB.style.left = (parseFloat(ballB.style.left) + separationX) + "px";
          ballB.style.top = (parseFloat(ballB.style.top) + separationY) + "px";
        }
      }
    }
  }
  
  function handleBallQuoteCollisions() {
    const quoteElements = document.querySelectorAll(".falling-quote");
    balls.forEach(ball => {
      const ballRadius = ball.radius;
      const ballX = parseFloat(ball.style.left) + ballRadius;
      const ballY = parseFloat(ball.style.top) + ballRadius;
      quoteElements.forEach(quote => {
        const rect = quote.getBoundingClientRect();
        const quoteX = rect.left;
        const quoteY = rect.top + window.scrollY;
        const quoteWidth = rect.width;
        const quoteHeight = rect.height;
        if (ball.velocityY > 0 && ballY < quoteY) {
          const closestX = Math.max(quoteX, Math.min(ballX, quoteX + quoteWidth));
          const closestY = Math.max(quoteY, Math.min(ballY, quoteY + quoteHeight));
          const distance = Math.hypot(ballX - closestX, ballY - closestY);
          if (distance < ballRadius) {
            ball.velocityX = -ball.velocityX * RESTITUTION;
            ball.velocityY = -ball.velocityY * RESTITUTION;
            quote.style.transform = "scale(1.2)";
            setTimeout(() => { quote.style.transform = "scale(1)"; }, 200);
          }
        }
      });
    });
  }
  
  let lastScrollTop = window.scrollY;
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
    lastScrollTop = scrollTop;
    balls.forEach(ball => {
      ball.velocityY += scrollDirection * 0.5;
    });
  });
  
  updateBalls();
  
  // --- Visitor Tracking ---
  // This function retrieves the visitor's public IP using ipify, gathers the user agent,
  // and (if allowed) their geolocation, then sends it to a server endpoint.
  function logVisitor() {
    const userAgent = navigator.userAgent;
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        // Try to get geolocation if available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            const visitorData = {
              ip,
              userAgent,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString()
            };
            // Send the data to your server-side logging endpoint.
            fetch('/api/logVisitor', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(visitorData)
            });
          }, function(error) {
            // On error (or if the user denies permission), send without location data.
            const visitorData = {
              ip,
              userAgent,
              timestamp: new Date().toISOString()
            };
            fetch('/api/logVisitor', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(visitorData)
            });
          });
        } else {
          const visitorData = {
            ip,
            userAgent,
            timestamp: new Date().toISOString()
          };
          fetch('/api/logVisitor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitorData)
          });
        }
      })
      .catch(err => console.error('Error fetching IP:', err));
  }
  
  // Call logVisitor on page load.
  logVisitor();
});
