// Resources Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if resources section exists on the page
  const resourcesSection = document.getElementById('resources');
  if (!resourcesSection) return;

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const resourceCards = document.querySelectorAll('.resource-card');
  const resourceModal = document.getElementById('resource-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const closeModalBtn2 = document.getElementById('close-modal-btn');
  const loadMoreBtn = document.getElementById('load-more-resources');

  // Tab functionality
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        filterResources(category);
      });
    });
  }

  // Filter resources by category
  function filterResources(category) {
    resourceCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-categories').includes(category)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Open modal when clicking on resource links
  const resourceLinks = document.querySelectorAll('.resource-link[data-resource-id]');
  resourceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const resourceId = this.getAttribute('data-resource-id');
      openResourceModal(resourceId);
    });
  });

  // Open modal function
  function openResourceModal(resourceId) {
    // In a real app, you would fetch the resource data based on the ID
    // For now, we'll just show the modal with the existing content
    resourceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal functions
  function closeModal() {
    resourceModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (closeModalBtn2) {
    closeModalBtn2.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(e) {
    if (e.target === resourceModal) {
      closeModal();
    }
  });

  // Load more resources functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // In a real app, you would fetch more resources here
      // For now, we'll just show an alert
      alert('Loading more resources...');
      // You can implement AJAX loading of more resources here
    });
  }
});
