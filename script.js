// Email form configuration for all pages (Method 1: Filename Detection)
const EMAIL_FORM_CONFIG = {
    'page2': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjgy',  // i-Ready Assessment (default)
    'page3': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhr',  // Teacher Toolbox
    'page4': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhc',  // iReady Personalized Instruction
    'page5': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhk',  // iReady Pro
    'page6': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjfr',  // Brigance
    'page7': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjj8',  // Mosaico Fundamentos
   'page8': 'https://info.curriculumassociates.com/l/869111/2025-06-24/7ptm2c',  // Mosaico Lectoescritura
    'page9': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhv',  // Magnetic Comprehension
    'page10': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhy', // Magnetic Foundations
    'page11': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjj2', // Magnetic Literacy
    'page12': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjjc', // Phonics for Reading
    'page13': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjfk', // Algebra 1
    'page14': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjgv', // California Mathematics
    'page15': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjh2', // Ready Mathematics
    'page16': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjhn', // iReady Matematicas
    'page17': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjjk', // iReady Mathematics
    'page18': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptjjn', // Ready Reading
    'pageai': 'https://info.curriculumassociates.com/l/869111/2025-06-23/7ptj98'   // AI Voice Overview
};

        // Get current page ID from filename
        function getCurrentPageId() {
            const filename = window.location.pathname.split('/').pop().replace('.html', '');
            console.log('Current page:', filename);
            
            // Handle the pageAI filename specifically (convert to lowercase)
            if (filename.toLowerCase() === 'pageai') {
                return 'pageai';
            }
            
            // Check if we have an email form config for this page
            if (EMAIL_FORM_CONFIG[filename]) {
                return filename;
            }
            
            console.warn('Page ID not found for filename:', filename, 'Using page2 as fallback');
            return 'page2'; // fallback
        }

// Sort/Filter functionality for navigation buttons (ORIGINAL FUNCTIONALITY)
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn[data-filter]');
    const productCards = document.querySelectorAll('.product-card[data-category]');
    const subjectCards = document.querySelectorAll('.subject-card[data-category]');
    
    // ORIGINAL FILTER FUNCTIONALITY
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button state
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter product cards
            productCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('greyed-out');
                } else {
                    card.classList.add('greyed-out');
                }
            });
            
            // Filter subject cards
            subjectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('greyed-out');
                } else {
                    card.classList.add('greyed-out');
                }
            });
            
            // Add visual feedback
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Initialize with All filter active (showing everything)
    const allBtn = document.querySelector('.nav-btn[data-filter="all"]');
    if (allBtn) {
        allBtn.click();
    }
    
    // NEW: SUB-PAGE FUNCTIONALITY (for pages with iframes and email buttons)
    // This will only run if the elements exist (i.e., on sub-pages)
    const navLinks = document.querySelectorAll('.nav-link');
    const contentFrame = document.getElementById('contentFrame');
    const fallbackContent = document.querySelector('.content-placeholder');
    const emailButton = document.querySelector('.email-button');
    
    // Only run sub-page functionality if elements exist
    if (navLinks.length > 0 && contentFrame && emailButton) {
        
        // Get the current page's email form URL
        const currentPageId = getCurrentPageId();
        const emailFormUrl = EMAIL_FORM_CONFIG[currentPageId];
        
        console.log('Current page:', currentPageId);
        console.log('Email form URL:', emailFormUrl);

        // Navigation links functionality
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Update iframe source based on selection
                const section = this.getAttribute('href').substring(1);
                updateIframeContent(section);
            });
        });

        // Email button functionality with page-specific form
        emailButton.addEventListener('click', function() {
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Hide fallback content
            if (fallbackContent) {
                fallbackContent.style.display = 'none';
            }
            
            // Hide any default images (for pages like page7 that show images by default)
            const imageContent = document.querySelector('.image-content');
            if (imageContent) {
                imageContent.style.display = 'none';
            }
            
            // ADD PADDING CLASS FOR EMAIL FORMS
            const iframeContainer = document.querySelector('.iframe-container');
            if (iframeContainer) {
                iframeContainer.classList.add('email-form');
            }
            
            // Show and load the page-specific email form iframe
            if (emailFormUrl) {
                contentFrame.style.display = 'block';
                contentFrame.src = emailFormUrl;
                console.log('Loading email form for', currentPageId + ':', emailFormUrl);
            } else {
                console.error('No email form URL found for page:', currentPageId);
                // Fallback to a default form
                contentFrame.style.display = 'block';
                contentFrame.src = 'https://info.curriculumassociates.com/l/869111/2021-08-05/5snvct';
            }
        });

        // Store the original iframe src on page load for each page
        const originalIframeSrc = contentFrame.src;
        
        // Update iframe content based on navigation
        function updateIframeContent(section) {
            // REMOVE PADDING CLASS WHEN NAVIGATING AWAY FROM EMAIL
            const iframeContainer = document.querySelector('.iframe-container');
            if (iframeContainer) {
                iframeContainer.classList.remove('email-form');
            }
            
            // Hide fallback content when loading iframe
            if (fallbackContent) {
                fallbackContent.style.display = 'none';
            }
            
            // Get current page to determine behavior
            const currentPageId = getCurrentPageId();
            
            switch(section) {
                case 'overview':
                    // Special handling for pages that show images by default (like page7, page8, and pageai)
                    if (currentPageId === 'page7' || currentPageId === 'page8' || currentPageId === 'pageai') {
                        // Hide iframe and show image
                        contentFrame.style.display = 'none';
                        const imageContent = document.querySelector('.image-content');
                        if (imageContent) {
                            imageContent.style.display = 'block';
                        }
                    } else {
                        // Normal pages - use their original iframe src (page-specific content)
                        const imageContent = document.querySelector('.image-content');
                        if (imageContent) {
                            imageContent.style.display = 'none';
                        }
                        contentFrame.style.display = 'block';
                        // Use the original src that was set in the HTML, or fallback to generic
                        // Skip empty src for pages like pageAI
                        if (originalIframeSrc && originalIframeSrc !== '' && originalIframeSrc !== 'about:blank') {
                            contentFrame.src = originalIframeSrc;
                        } else {
                            contentFrame.src = 'https://online.flippingbook.com/view/634657302/';
                        }
                    }
                    break;
                case 'math-tour':
                case 'instruction': // Handle page4's different href value
                    // Hide image, show iframe
                    const imageContent = document.querySelector('.image-content');
                    if (imageContent) {
                        imageContent.style.display = 'none';
                    }
                    contentFrame.style.display = 'block';
                    
                    // Special handling for different pages
                    if (currentPageId === 'pageai') {
                        // Voice AI product video - using Vidyard embed URL for clean video-only display
                        contentFrame.src = 'https://play.vidyard.com/H1kof76vNwsYuvJzX2tS4L.html';
                    } else if (currentPageId === 'page4') {
                        // i-Ready Personalized Instruction Math Tour
                        contentFrame.src = 'https://curriculum-associates.navattic.com/4le06b9';
                    } else if (currentPageId === 'page5') {
                        // i-Ready Pro Math Tour
                        contentFrame.src = 'https://curriculum-associates.navattic.com/je8n0phr';
                    } else {
                        // Default math tour for other pages
                        contentFrame.src = 'https://curriculum-associates.navattic.com/je8n0phr';
                    }
                    break;
                case 'reading-tour':
                case 'progress': // Handle page4's different href value
                    // Hide image, show iframe
                    const imageContent2 = document.querySelector('.image-content');
                    if (imageContent2) {
                        imageContent2.style.display = 'none';
                    }
                    contentFrame.style.display = 'block';
                    
                    // Special handling for different pages
                    if (currentPageId === 'page4') {
                        // i-Ready Personalized Instruction Reading Tour
                        contentFrame.src = 'https://curriculum-associates.navattic.com/fq15j08sb';
                    } else if (currentPageId === 'page5') {
                        // i-Ready Pro Reading Tour
                        contentFrame.src = 'https://curriculum-associates.navattic.com/46mq079m';
                    } else {
                        // Default reading tour for other pages
                        contentFrame.src = 'https://curriculum-associates.navattic.com/46mq079m';
                    }
                    break;
                default:
                    // Default behavior - show image for page7/page8/pageai, iframe for others
                    if (currentPageId === 'page7' || currentPageId === 'page8' || currentPageId === 'pageai') {
                        contentFrame.style.display = 'none';
                        const imageContent = document.querySelector('.image-content');
                        if (imageContent) {
                            imageContent.style.display = 'block';
                        }
                    } else {
                        const imageContent = document.querySelector('.image-content');
                        if (imageContent) {
                            imageContent.style.display = 'none';
                        }
                        contentFrame.style.display = 'block';
                        // Use original src or fallback, avoiding empty sources
                        if (originalIframeSrc && originalIframeSrc !== '' && originalIframeSrc !== 'about:blank') {
                            contentFrame.src = originalIframeSrc;
                        } else {
                            contentFrame.src = 'https://online.flippingbook.com/view/634657302/';
                        }
                    }
                    if (fallbackContent) {
                        fallbackContent.style.display = 'block';
                    }
            }
        }

        // Handle iframe load errors
        contentFrame.addEventListener('error', function() {
            if (fallbackContent) {
                fallbackContent.style.display = 'block';
                fallbackContent.innerHTML = '<p>Content failed to load. Please try again.</p>';
            }
        });
        
        // Optional: Add visual feedback when email button is clicked
        emailButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        emailButton.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    }
});