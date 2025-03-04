import Filter from './Filter'
import Products from './Products'

export default function ProductList(){
    return (
        <div className="p-10 flex">
            <div className="w-1/4">
                <Filter />
            </div>
            <div className="w-3/4">
                <Products />
            </div>
        </div>
    )
}
