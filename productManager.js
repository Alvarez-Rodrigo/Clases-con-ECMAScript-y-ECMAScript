
class ProductManager{

    #products
    #path
    #format
    constructor(path){
        this.#products = []
        this.#format = 'utf-8'
        this.#path = path
    }

    #generateId = async () => {
        return this.#products.length === 0 ? 1 : this.#products[this.#products.length -1].id +1
    }

    //Metodo para validar campos y sabes si el producto existe.

    #validateProduct = async(product) =>{
        for (const [key, value] of Object.entries(product)){
            if(!value){
                console.log(`El producto ${product.title} tiene el campo ${key} sin completar.`)
                return false
            }
        }
        const existingProduct = await this.#products.find(p => p.code === product.code)
        if(existingProduct !== undefined){
            console.log(`Ya existe el producto con el codigo ${product.code}`)
            return false
        }
        return true
    }

//Agrega productos.

    addProducts = async(title, description, price, thumbnail, code, stock) => {
        const newProduct = {id : await this.#generateId(), title, description, price, thumbnail, code, stock}

        if(this.#validateProduct(newProduct)){
            this.#products.push(newProduct)
            await FileSystem.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
            return newProduct
        }
    }

    //Muestro el array

    getProduct = async() =>{
        try{
            return JSON.parse(await FileSystem.promises.readFile(this.#path, this.#format))
        }catch (err){
            console.log('error: no se encuentra archivo')
            return[]
        }
    } 

    //Busco Id igual

    getProductById = async(id) =>{
        const product = this.#products.find(p => p.id === id)
        return product || `No se encuentra producto el ID ${id}`
    }

    upDateProducto =async(id, update) =>{
        const isValid = await this.#products.findIndex(p => p.id === id)
        if(index !== -1){
            if(!isValid){
                return console.log('Error de actualizacion: Actualizacion invalida')
            }
            this.#products[index] = {...this.#products[index], ...update}
            await FileSystem.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
            return console.log('Producto actualizado', this.#products[index])
        }
        return console.log('Error: Producto no encontrado')
        
    }

    deleteProduct = async(id) =>{
        try{
            const product = this.#products.find(p => p.id === id)
            if(!product){
                return `No existe el producto con ID ${id}`
            }
            const filterProductos = this.#products.filter(p => p.id !==id)
            if(this.#products.length !== filterProductos.length){
                await FileSystem.promises.writeFile(this.#path, JSON.stringify(filterProductos, null, '\t'))
                return `${product.title}: Producto eliminado`
            }
        }catch(err){
            console.log(err)
        }
    }
}

const productManager = new ProductManager()

console.log(productManager.getProduct())

productManager.addProducts(
    'Producto1',
    'Descripcion del producto',
    20,
    'imagen1.png',
    '01',
    10
)

productManager.addProducts(
    'Producto2',
    'Descripcion del producto2.0',
    30,
    'imagen2.png',
    '02',
    60
)

productManager.addProducts(
    'Producto3',
    'Descripcion del producto3.0',
    80,
    'imagen3.png',
    '03',
    3
)




