document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('simulator-video');
    const playButton = document.getElementById('video-play-button');
    
    if (video && playButton) {
        // Toggle play/pause when clicking the play button
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.classList.add('playing');
            } else {
                video.pause();
                playButton.classList.remove('playing');
            }
        });
        
        // Update play button state when video ends
        video.addEventListener('ended', function() {
            playButton.classList.remove('playing');
        });
        
        // Show/hide play button based on video state
        video.addEventListener('play', function() {
            playButton.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            playButton.classList.remove('playing');
        });
        
        // Hide play button when video is playing and user hovers over
        video.addEventListener('mouseenter', function() {
            if (!video.paused) {
                playButton.style.opacity = '0';
            }
        });
        
        video.addEventListener('mouseleave', function() {
            playButton.style.opacity = '1';
        });
        
        // Toggle play/pause when clicking the video
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.classList.add('playing');
            } else {
                video.pause();
                playButton.classList.remove('playing');
            }
        });
    }
});
