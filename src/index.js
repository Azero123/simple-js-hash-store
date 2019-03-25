const sha2 = require('./sha2-256.js')
const fs = require('fs')

class HashStore {
    constructor(directory, hashFunction = sha2) {
        this.directory = directory
        this.hashFunction = hashFunction
        this.memory = {}
        if (!fs.existsSync(this.directory)){
          fs.mkdirSync(this.directory);
        }
    }
    get(hash) {
        const data = this.memory[hash]
        if (data) {
            return data
        }
        try {
            return this.memory[hash] = JSON.parse(fs.readFileSync(`${this.directory}/${hash.slice(0, 5)}.json`))[hash]
        }
        catch (e) { }
        return undefined
    }
    save(data) {
        let jsonForm = data
        if (typeof jsonForm !== 'string') {
            jsonForm = JSON.stringify(jsonForm)
        }
        const hash = this.hashFunction(jsonForm)
        this.memory[hash] = data
        this.store(data, hash)
        return hash
    }
    store(data, hash) {
        let dictionary = {}
        try {
          dictionary = JSON.parse(fs.readFileSync(`${this.directory}/${hash.slice(0, 5)}.json`))
        } catch (e) {}
        dictionary[hash] = data
        fs.writeFileSync(`${this.directory}/${hash.slice(0, 5)}.json`, JSON.stringify(dictionary), 'utf8')
    }
    freeMemory(hash) {
        if (!hash) {
            const hashes = Object.keys()
            if (hashes.length) {
                hash = hashes[Math.random() | 0] 
            }
            else {
                throw 'nothing to free'
            }
        }
        delete this.memory[hash]
    }
    freeStorage(file) {
        if (!file) {
            const files = fs.readdirSync(`${this.directory}`)
            if (files.length) {
                file = files[Math.random() | 0] 
            }
            else {
                throw 'nothing to free'
            }
        }
        fs.unlinkSync(`${this.directory}/${file}`)
    }
}
module.exports = HashStore