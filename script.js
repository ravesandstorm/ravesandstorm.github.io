let lightModeHoverSound;
    let soundFadeInterval;

    function playSwitchSound() {
        const lightSound = document.getElementById('light-switch');
        lightSound.currentTime = 0;
        lightSound.play();
    }

    function playHoverSound() {
        const hoverSound = document.getElementById('hover-sound');
        hoverSound.currentTime = 0;
        hoverSound.play();
    }

    function startLightModeHoverSound() {
        lightModeHoverSound = document.getElementById('light-mode-hover-sound');
        lightModeHoverSound.volume = 0; // Start with zero volume
        lightModeHoverSound.loop = true; // Loop the sound
        lightModeHoverSound.play();

        // Gradually increase volume to 1
        clearInterval(soundFadeInterval);
        soundFadeInterval = setInterval(function() {
            if (lightModeHoverSound.volume < 1) {
                lightModeHoverSound.volume += 0.1;
            } else {
                clearInterval(soundFadeInterval);
            }
        }, 100);
    }

    function stopLightModeHoverSound() {
        if (lightModeHoverSound) {
            // Gradually decrease volume to 0
            clearInterval(soundFadeInterval);
            soundFadeInterval = setInterval(function() {
                if (lightModeHoverSound.volume > 0) {
                    lightModeHoverSound.volume -= 0.1;
                } else {
                    clearInterval(soundFadeInterval);
                    lightModeHoverSound.pause(); // Pause the sound
                    lightModeHoverSound.currentTime = 0; // Rewind to the beginning
                }
            }, 100);
        }
    }

    let timeoutId;

    function resetBackgroundPosition() {
        const background = document.querySelector(".background-image");
        background.style.transform = 'translate(-50%, -50%)';
    }

    document.addEventListener("DOMContentLoaded", function () {
        const background = document.querySelector(".background-image");
        document.addEventListener("mousemove", function (e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            background.style.transform = `translate(calc(-50% + ${-mouseX * 20}px), calc(-50% + ${-mouseY * 20}px))`;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(resetBackgroundPosition, 1000); // Adjust delay as needed

            // Create particle
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = e.clientX + "px";
            particle.style.top = e.clientY + "px";
            document.body.appendChild(particle);
            // Remove particle after animation
            particle.addEventListener("animationend", function() {
                particle.parentNode.removeChild(particle);
            });
        });
        
        document.addEventListener("click", function (e) {
            // Create splash effect
            const splash = document.createElement("div");
            splash.className = "splash-effect";
            splash.style.left = (e.clientX-27) + "px";
            splash.style.top = (e.clientY-27) + "px";
            
            document.body.appendChild(splash);
            // Remove splash effect after animation
            splash.addEventListener("animationend", function() {
                splash.parentNode.removeChild(splash);
            });
        });
    });

    function toggleDarkMode() {
        const body = document.body;
        const container = document.querySelector('.container');
        const lightModeButton = document.querySelector('.light-mode-button button');
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            container.style.color = '#dbdbdb';
            body.style.backgroundColor = '#333';
            lightModeButton.textContent = 'Light? Mode';
        } else {
            body.classList.add('light-mode');
            container.style.color = '#333';
            body.style.backgroundColor = '#dbdbdb';
            lightModeButton.textContent = 'Dark? Mode';
        }
    }