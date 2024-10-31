// mobile_app.js

// Function to create and animate gravity balls
document.getElementById('gravity-btn').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        createGravityBall();
    }
});

function createGravityBall() {
    const ball = document.createElement('div');
    ball.classList.add('gravity-ball');
    document.body.appendChild(ball);

    // Random start position and animation
    const startX = Math.random() * window.innerWidth;
    const startY = -50;
    ball.style.left = `${startX}px`;
    ball.style.top = `${startY}px`;

    let velocityY = 1;
    let interval = setInterval(() => {
        let ballTop = ball.offsetTop;
        if (ballTop + velocityY >= window.innerHeight - 80) {
            velocityY *= -0.7; // Bounce with dampening
        } else {
            velocityY += 0.5; // Simulate gravity
        }
        ball.style.top = `${ballTop + velocityY}px`;

        // Stop ball eventually
        if (Math.abs(velocityY) < 0.5 && ballTop >= window.innerHeight - 85) {
            clearInterval(interval);
        }
    }, 16);
}

// Admin button function placeholder
document.getElementById('admin-btn').addEventListener('click', () => {
    alert('Admin panel not available in mobile view.');
});
