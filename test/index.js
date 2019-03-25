const HashStore = require('../src/index.js')
const hashStore = new HashStore('./data')
const reference = hashStore.save('test')
if (hashStore.get(reference) !== 'test') {
    throw 'failed to retrieve stored data'
}
hashStore.freeMemory(reference)

if (hashStore.get(reference) !== 'test') {
    throw 'out of memory data should be retrievable'
}
hashStore.freeStorage()

if (hashStore.get(reference) !== 'test') {
    throw 'out of storage data should be in memory'
}

hashStore.freeMemory(reference)

if (hashStore.get(reference) !== undefined) {
    throw 'after releasing from memory and removing from storage, reference should be gone'
}

hashStore.save('test')

const secondHashStore = new HashStore('./data')

if (secondHashStore.get(reference) !== 'test') {
    throw 'stored data should be retrievable after restarts'
}

hashStore.freeStorage()

console.log('✅ hash store test passed')