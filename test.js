// Simple test framework
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log('🧪 Running tests...\n');
        
        for (const test of this.tests) {
            try {
                await test.fn();
                this.passed++;
                console.log(`✓ ${test.name}`);
            } catch (error) {
                this.failed++;
                console.error(`✗ ${test.name}`);
                console.error(`  Error: ${error.message}`);
            }
        }

        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Create test runner
const runner = new TestRunner();

// DOM Tests
runner.test('Page title should exist', () => {
    assert(document.title.length > 0, 'Title is empty');
});

runner.test('Counter element should exist', () => {
    const counter = document.getElementById('counter');
    assert(counter !== null, 'Counter element not found');
});

runner.test('Counter should start at 0', () => {
    const counter = document.getElementById('counter');
    assert(counter.textContent === '0', 'Counter does not start at 0');
});

runner.test('Increment button should exist', () => {
    const buttons = document.querySelectorAll('.btn');
    assert(buttons.length >= 2, 'Buttons not found');
});

runner.test('Cards should be present', () => {
    const cards = document.querySelectorAll('.card');
    assert(cards.length === 3, 'Expected 3 cards');
});

// Function Tests
runner.test('incrementCounter function should exist', () => {
    assert(typeof incrementCounter === 'function', 'incrementCounter is not a function');
});

runner.test('resetCounter function should exist', () => {
    assert(typeof resetCounter === 'function', 'resetCounter is not a function');
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runner, assert };
}