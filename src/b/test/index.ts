function testEventLoop () {
    for (let i = 0; i < 10; i++) {
        testInner();
    }

    function testInner () {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => console.log('setTimeout', i), 100);
        }
        for (let i = 0; i < 10; i++) {
            setImmediate(() => console.log('setImmediate', i));
        }
        for (let i = 0; i < 10; i++) {
            process.nextTick(() => console.log('nextTick', i));
        }
    }
}

function testPrototype () {
    class Test {

    }

    Object.assign(Test.prototype, {
        props: []
    });

    const testInstance = new Test();
    console.log(testInstance['props']);
    console.log(delete testInstance['props']);
    console.log(testInstance['props']);
    console.log(Test.prototype);
    console.log(Test.prototype.constructor);
    console.log(Test.prototype.constructor.prototype);
    console.log(Test.prototype.constructor.prototype.prototype);
}

export default {
    testEventLoop,
    testPrototype
}
