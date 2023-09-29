
class ProductManager{

    #products
    #error
    constructor(){
        this.#products = []
        this.#error = undefined
    }

    #generateId = () =>(this.#products.length === 0) ? 1 : this.#products[this.#products.length -1].id +1

    //Metodo para validar campos y sabes si el producto existe.

    #validateProduct = (title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || !code || !stock){ this.#error = `Falta completar campos`}
        else{
            const existeProduct = this.#products.find((item) =>item.code === code)
    
            if(existeProduct){
                this.#error = `El codigo del producto ya existe.`
            }else{
                this.#error = undefined
            }
        }
    } 

//Agrega productos.

    addProducts = (title, description, price, thumbnail, code, stock) => {this.#validateProduct(title, description, price, thumbnail, code, stock)

        if(this.#error === undefined){
        this.#products.push({id: this.#generateId(), title,description, price, thumbnail, code, stock})
        }else{
            console.log(this.#error)
        }
    }

    //Muestro el array

    getProduct = () => this.#products

    //Busco Id igual

    getProductById = (id) => {
        const productId = this.#products.find((item) => item.id === id)

        if(!productId){
            return `Producto no encontrado`
        }else {
            return productId
        }
    }
}






