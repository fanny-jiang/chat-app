var selector = 'div.w-row.x-ua-homepage-secondary-row.dyother.dyMonitor'

var reorder = function (newOrder, selectors) {
  var container = document.querySelector(selectors);
  if (container) {   // check to make sure element exists
    var children = container.children;
    newOrder.forEach(function(elem, i) {
      var newIndex = newOrder[i] - 1;   // array indices are offset by 1
      container.appendChild(children[newIndex])
    })
  }
}

reorder([3, 1, 2], selector);


/* I wrote this function to be as reusable as possible.
Instead of taking a list of arguments with an unknown length, it takes an array
indicating the new order that the elements should be arranged in. I also use
document.querySelector() to identify the first matching element of which to manipulate in
the DOM. document.querySelector also allows for more specificity to locate the single element.
If that element exists, I grab the element's children nodes and iterate over the
new order array, appending the children in the new order.
*/
