(function () {
    let stateChanged = new Event('StateChanged');
    // let unique = 0;
    let state = {};

    window.storage = new class {

        addItem(data) {
            // let
            state[unique] = data;
            unique++;
            console.log(state);
            window.dispatchEvent(stateChanged);
        }


        // setItem(id, data) {
        //     // state[id] = data;
        //     // window.dispatchEvent(stateChanged);
        // }


        // removeItem(id) {
        //     // delete state[id];
        //     // window.dispatchEvent(stateChanged);
        // }


        // get items() {
        //     return state;
        // }
    }



})();
