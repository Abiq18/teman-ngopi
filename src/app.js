document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
            items: [
                { id: 1, name: 'Biji Kopi Brazil', img: 'produk-1.jpg', price: 30000 },
                { id: 2, name: 'Biji Kopi Blue Tokai', img: 'produk-2.jpg', price: 45000 },
                { id: 3, name: 'Biji Kopi Earlybird', img: 'produk-3.jpg', price: 25000 },
                { id: 4, name: 'Biji Kopi Battlecreek', img: 'produk-4.jpg', price: 30000 },
            ],
        }));

        Alpine.store('cart', {
            items: [],
            total: 0,
            quantity: 0,
            add(newItem) {
                // cek apakah ada barang yang sama di cart
                const cartItem = this.items.find((item) => item.id === newItem.id);

                // jika belum ada/cart masih kosong
                if(!cartItem) {
                    this.items.push({...newItem, quantity: 1, total: newItem.price });
                    this.quantity++;
                    this.total += newItem.price;
                } else {
                    // jika barang sudah ada, cek apakah barang beda atau sama dengan barang yang ada di cart
                    this.items = this.items.map((item) => {
                        // jika barangnya beda
                        if(item.id !== newItem.id) {
                            return item;
                        } else {
                            // jika barang sudah ada , tamabah quantity dan totalnya
                            item.quantity++;
                            item.total = item.price * item.quantity;
                            this.quantity++;
                            this.total += item.price;
                            return item;
                        }
                    });
                }
            },
            remove(id) {
                // ambil item yang mau di remove berdasarkan id nya
                const cartItem = this.items.find((item) => item.id === id);

                // jika item lebih dari 1
                if(cartItem.quantity > 1) {
                    this.items = this.items.map((item) => {
                        // jika bukan barang yang diklik skip
                        if(item.id !== id) {
                            return item;
                        } else {
                            item.quantity--;
                            item.total = item.price * item.quantity;
                            this.quantity--;
                            this.total -= item.price;
                            return item;
                        }
                    });
                } else if (cartItem.quantity === 1) {
                    // jika baranggnya sisa 1
                    this.items = this.items.filter((item) => item.id !== id)
                    this.quantity--;
                    this.total -= cartItem.price;
                }
            },
        });
    });
    


    // konversi ke rupiah
    const rupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };