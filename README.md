#DOMinodes
DOMinodes is a library based on jQuery that allows the user to make AJAX requests, handle events, and manipulate the DOM. This is implemented using JavaScript and the native DOM API.

##Technical
DOMinodes includes several methods:
- html: allows the user to either set the innerHTML of an element by passing an argument, or returns the innerHTML of the first node in the Array
- empty: removes all nodes in the internal array
- append: accepts a DOMinode, HTML element, or a string. It will append the outerHTML of each element in the argument to the innerHTMl of each element in the DOMinode
- attr:
- addClass: adds a class to elements passed in
- removeClass: removes a class from elements passed in
- children: returns a DOMinode containing all the children of all nodes in the array
- parent: returns a DOMinode containing the parents of each node
- find: returns a DOMinode of all nodes matching the selector passed in as an argument
- remove: removes the html of all nodes in the array, and removes all nodes from the array
