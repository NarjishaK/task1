interact('.resize-box')
  .resizable({
    // Resize from all edges and corners
    edges: { left: true, right: true, bottom: false, top: false },
    listeners: {
      move(event) {
        let target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
        let flexgrow = target.style.flexGrow || 1;
        flexgrow *= (event.rect.width / target.getBoundingClientRect().width);
        if (flexgrow < 0.5) flexgrow = 0.5;
        if (flexgrow > 3) flexgrow = 3;
        target.style.flexGrow = flexgrow;
        target.style.webkitFlexGrow = flexgrow; // Safari compatibility
        target.setAttribute('data-x', x);
      }
    },
    modifiers: [
      // Minimum size
      interact.modifiers.restrictSize({
        min: { width: 100 }
      })
    ],
    inertia: true
  })
  .on('resizeend', function(event) {
    var target = event.target;
    // reset the size attributes
    target.style.width = 'auto';
    target.style.height = 'auto';
  });
