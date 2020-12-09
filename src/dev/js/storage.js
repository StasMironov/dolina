(function () {
    let stateChanged = new Event('StateChanged');
    let state = {};



    window.storage = new class {

        addItem(id, data) {
            let setItem = {};
            setItem['val'] = data.val;
            state[id] = setItem;
            window.dispatchEvent(stateChanged);
        }

        updateItem(id, data) {
            state[id].val = data;
            //console.log(state);
            window.dispatchEvent(stateChanged);
        }

        showItem() {
            window.dispatchEvent(stateChanged);
        }

        get items() {
            return state;
        }
    }
})();
