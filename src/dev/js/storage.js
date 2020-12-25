(function(){


    // Загрузка сохраненного значения
    var storage = JSON.parse(window.localStorage.getItem('cart') || "{}");

    // Публичный интерфейс
    window.cart = new class
    {

        /**
         * Сохраняет значение и оповещает наблюдателей
         */
        refresh() {
            window.localStorage.setItem('cart', JSON.stringify(storage));
            window.dispatchEvent(new Event('cartUpdated'));
            // 
        }


        /**
         * Устанавливает параметры элемента корзины
         */
        setItem (id, count, name, image, weight, text, cost) {

            if (!id) throw "Товару нужен id!";

            if (count <= 0) {

                delete storage[id];

            } else {

                let current = this.getItem(id);
                // console.log(current['image']);
                console.log('set item');
                storage[id] = {
                    
                    name: name || current['name'],
                    image: image || current['image'],
                    text: text || current['text'],
                    weight: weight || current['weight'],
                    cost: cost || current['cost'],
                    count: count || current['count']
                }

            }

            this.refresh();
        }

        deleteItem(id){
            delete storage[id];
            this.refresh();
        }

        /**
         * То же, что и setItem, только count - это разница.
         * Нужно, чтобы не заморачиваться с получением.
         */
        addItem (id, count, name, image, weight, text, cost) {

            count = this.getItem(id)['count'] + count;
            this.setItem(id, count, name, image, weight, text, cost);
        }


        /**
         * Возвращает элемент корзины или дефолтное значение.
         * Нужно, чтобы не заморачиваться с проверками
         */
        getItem (id) {
            return (id && storage[id]) || {
                name: '',
                imgage: '',
                text: '',
                weight: 0,
                cost: 0,
                count: 0
            }
        }


        /**
         * Возвращает массив элементов корзины.
         */
        get items () {
            return storage;
        }


        get total () {

            let cost = 0;
            let count = 0;
            for (let id in storage) {
                cost = cost + (parseInt(storage[id]['cost']) * parseInt(storage[id]['count']));
                count++;
            }
            
            return {
                'cost': cost,
                'count': count
            }
        }

    }


    // Реакция на сохранение данных из другого окна.
    // Событие НЕ срабатывает при сохранении из текущего окна.
    window.addEventListener('storage', function () {
            storage = JSON.parse(window.localStorage.getItem('cart') || "{}");
            window.dispatchEvent(new Event('cartUpdated'));
        })

})()