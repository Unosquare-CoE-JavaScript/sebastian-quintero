function toggle() {
    var args = Array.prototype.slice.call(arguments);
    var currentIndex = 0;
    return function step() {
        return args[currentIndex++ % args.length];
    }
}

var hello = toggle("hello");
console.log(hello());
console.log(hello());

var onOff = toggle("on", "off");
console.log(onOff());
console.log(onOff());
console.log(onOff());

var speed = toggle("slow", "medium", "fast");
console.log(speed());
console.log(speed());
console.log(speed());
console.log(speed());
