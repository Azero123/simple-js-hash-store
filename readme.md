how to import:
```
const HashStore = require('simple-js-hash-store')
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

# contribute

bitcoin address: 1KKiniL7QnMPZZLjgGB2Kq1d7zsjUr6TnS 

ethereum address: 0x177b258bD53A8F7d8C609A9277A60A51d1e7e0e0