import { IoBrowserCache } from 'storage/io-browser-cache';
import { StorageBase } from 'storage/storage-base';

class StorageDenoKv extends StorageBase {
    name = 'denokv';
    icon = 'database';
    enabled = true;

    init() {
        super.init();
        this.io = new IoBrowserCache({
            cacheName: 'FilesCacheDenoKV',
            logger: this.logger
        });
    }

    async save(id, _opts, data, callback) {
        const body = new Uint8Array(data);
        this.logger.debug('SAVING', id, body.length);
        const response = await fetch('/api/save', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to save file');
        }
        this.logger.debug('SAVED', id);
        callback();
    }

    async load(id, _opts, callback) {
        this.logger.debug('LOADING...', id);
        const response = await fetch('/api/read');
        if (!response.ok) {
            throw new Error('Failed to load file');
        }
        const buffer = await response.arrayBuffer();
        const array = new Uint8Array(buffer);
        this.logger.debug('LOADED', array.length);
        callback(null, buffer);
    }

    async remove(id, opts, callback) {
        // this.io.remove(id, callback);
        this.logger.debug('Remove request. Ignoring...', id);
        callback();
    }

    async stat(path, opts, callback) {
        this.logger.debug('Stat request. Ignoring...', path);
        callback(null, { rev: path });
    }
}

export { StorageDenoKv };
