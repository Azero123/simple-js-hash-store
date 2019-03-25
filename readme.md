how to import:
```
const HashStore = require('../src/index.js')
const hashStore = new HashStore('./data')
```
storing data
```
const reference = hashStore.save('test')
```
if memory encombered you can remove a specific item from memory using it's reference
```
hashStore.freeMemory(reference)
```
if memory encombered you can remove a random item from memory
```
hashStore.freeMemory()
```
if storage is full you can remove a random data from storage
```
hashStore.freeStorage()
```
