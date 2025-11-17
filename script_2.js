const canvas = document.getElementById("phase2Canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

(function () {
    const sample = 'UTF-8 check: ✓ — save this file as UTF-8';
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        console.log('Running in browser. document.charset =', document.characterSet || document.charset);
        console.log(sample);
    } else {
        console.log('Running in Node.js');
        console.log(sample);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    
    let animationId;
    const dots = [];
    const numDots = 20; 
    const maxSpeed = 3;
    const minSpeed = 1;
    
   
    function initializeSwarm() {
        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                dy: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                radius: Math.random() * 3 + 2, 
                color: {
                    r: 255, 
                    g: 255,
                    b: 255
                }
            });
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let dot of dots) {
            
            dot.x += dot.dx;
            dot.y += dot.dy;
            
            
            if (dot.x + dot.radius > canvas.width || dot.x - dot.radius < 0) {
                dot.dx = -dot.dx;
                
                dot.x = Math.max(dot.radius, Math.min(canvas.width - dot.radius, dot.x));
            }
            
            if (dot.y + dot.radius > canvas.height || dot.y - dot.radius < 0) {
                dot.dy = -dot.dy;
               
                dot.y = Math.max(dot.radius, Math.min(canvas.height - dot.radius, dot.y));
            }
            
           
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
        
        animationId = requestAnimationFrame(animateCanvas);
    }
    
    
    initializeSwarm();
    animateCanvas();
});