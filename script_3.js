const canvas = document.getElementById("phase3Canvas");
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
    
    
    const mouse = {
        x: null,
        y: null
    };
    
    
    const interactionDistance = 100;
    
    
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        // Scale mouse coordinates to match canvas internal dimensions
        mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
        mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
    });
    
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    let animationId;
    const dots = [];
    const numDots = 1; 
    const maxSpeed = 3;
    const minSpeed = 1;
    
   
    function initializeSwarm() {
        for (let i = 0; i < numDots; i++) {
            const originalRadius = Math.random() * 5 + 5;
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                dx: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                dy: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() < 0.5 ? -1 : 1),
                radius: originalRadius,
                originalRadius: originalRadius, 
                targetRadius: originalRadius, 
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
            
            
            // Mouse interaction logic
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < interactionDistance) {
                    // Mouse is close - grow the particle
                    dot.targetRadius = dot.originalRadius * 5;
                } else {
                    // Mouse is far - return to original size
                    dot.targetRadius = dot.originalRadius;
                }
            } else {
                // No mouse detected - return to original size
                dot.targetRadius = dot.originalRadius;
            }
            
            // Smooth radius transition
            const diff = dot.targetRadius - dot.radius;
            if (Math.abs(diff) > 0.5) {
                // Animate towards target
                dot.radius += diff * 0.3;
            } else {
                // Close enough - snap to target for precise reset
                dot.radius = dot.targetRadius;
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