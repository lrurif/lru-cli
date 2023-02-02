import { set, get, getAll } from "./utils/rw.js"
export default (action, key, value) => {
    switch(action) {
        case "get":
            if(key) {
                get(key)
            }else {
                getAll();
            }
            break;
        case "set":
            set(key, value)
            break;
        default:
            console.log();
            break;
    }
}