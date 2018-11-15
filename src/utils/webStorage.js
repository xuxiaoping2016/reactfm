/* eslint-disable */
export default class WebStorage {
    constructor(
        storage,
        namespace,
        expires = 1000 * 3600 * 24 * 30,
        version = 1
    ) {
        if (storage !== 'sessionStorage' && storage !== 'localStorage') {
            throw new Error(
                'Please use "sessionStorage" or "localStorage" in first arguments'
            );
        }
        if (!namespace) {
            throw new Error('Please edit a namespace in second  arguments');
        }
        Object.defineProperty(this, '_attr', {
            value: {
                storage,
                namespace,
                expires,
                version,
            },
            writable: false,
            enumerable: false,
            configurable: false,
        });

        Object.keys(this.values).forEach(item => {
            this.getItem(item);
        });
    }
    static formatName(name, namespace) {
        if (typeof name !== 'string') {
            throw new TypeError('name must be string');
        }
        if (typeof namespace !== 'string') {
            throw new TypeError('namespace must be string');
        }
        if (namespace.trim().length === 0) {
            throw new TypeError('namespace is required');
        }
        return `${namespace}__${name}`;
    }
    static unformatName(value, namespace) {
        if (value.length + 2 < namespace) {
            return '';
        }
        return value.substring(namespace.length + 2);
    }
    static formatValue(value, { expires, version }) {
        return JSON.stringify({
            value,
            expires: Date.now() + expires,
            version,
        });
    }

    get values() {
        const { storage, namespace } = this._attr;
        const result = {};
        Object.keys(window[storage])
            .filter(
                item => item.indexOf(WebStorage.formatName('', namespace)) === 0
            )
            .forEach(item => {
                const name = WebStorage.unformatName(item, namespace);
                if (this.getItem(name)) {
                    result[name] = this.getItem(name);
                }
            });
        return result;
    }

    removeItem(name) {
        window[this._attr.storage].removeItem(
            WebStorage.formatName(name, this._attr.namespace)
        );
    }

    setItem(name, value) {
        window[this._attr.storage].setItem(
            WebStorage.formatName(name, this._attr.namespace),
            WebStorage.formatValue(value, this._attr)
        );
    }

    getItem(name) {
        try {
            const { value, expires, version } = JSON.parse(
                window[this._attr.storage].getItem(
                    WebStorage.formatName(name, this._attr.namespace)
                )
            );
            if (expires < Date.now()) {
                throw new Error('Out of date');
            }
            if (version !== this._attr.version) {
                return null;
            }
            return value;
        } catch (e) {
            this.removeItem(name);
            return null;
        }
    }
    clear() {
        Object.keys(this.values).forEach(item => this.removeItem(item));
    }
}
