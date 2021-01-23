export class API {
    constructor(host, port) {
        this._url = `ws://${host}:${port}`;
        this._subscribers = [];
        this._messageHandler = this._messageHandler.bind(this);
        this._openHandler = this._openHandler.bind(this);
        this._reconnect = this._reconnect.bind(this);
    }

    connect() {
        this._ws = new WebSocket(this._url);
        this._ws.onopen = this._openHandler;
        this._ws.onmessage = this._messageHandler;
        this._ws.onclose = this._reconnect;
    }

    disconnect() {
        if (!this._ws) {
            return
        }
        this._ws.removeEventListener('message', this._messageHandler);
        this._ws.removeEventListener('open', this._openHandler);
        this._ws.removeEventListener('close', this._reconnect);
        this._ws.close();
        this._ws = null;
        console.log('ws closed')
    }

    _messageHandler(e) {
        const newMessages = JSON.parse(e.data);
        this._subscribers.forEach(subs => subs(newMessages));
    }

    _openHandler() {
        this._ws.readyState === 1 &&
        this._ws.send({cmd: 'get_list'});
        console.log('ws open');
    }

    subscribe(callback) {
        this._subscribers.push(callback);
        return () => this._subscribers = this._subscribers.filter(subs => subs !== callback);
    }

    _reconnect() {
        return setTimeout(() => {
            console.log('reconnect');
            this.disconnect();
            this.connect();
        }, 3000);
    }
}

const api = new API('testapi.marit.expert', '3004');
api.connect();
export default api;
