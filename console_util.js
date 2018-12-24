console;
console.Console;
console.log('One %s', 'thing');

util.format('One %s', 'thing');
util.inspect(module);
util.inspect(global, { depth: 0 });

console.dir(global, { depth: 0 });

// just like console.error but shows the callstack upon calling console.trace
console.trace('here');
