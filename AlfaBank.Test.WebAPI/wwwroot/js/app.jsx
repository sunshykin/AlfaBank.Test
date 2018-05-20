/*class Hello extends React.Component {
    render() {
        return <h1>Привет, React.JS</h1>;
    }
}
ReactDOM.render(
    <Hello />,
    document.getElementById("content")
);*/

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.data = props.product;
        this.type = props.type;
    }
    render() {
        return <tr className={"table-" + this.type}>
            <td>{this.data.part_number}</td>
            <td>{this.data.name}</td>
            <td>{this.data.description}</td>
            <td>{this.data.price}</td>
            <td>{this.data.supplier}</td>
            <td>{this.data.vendor}</td>
            <td>{this.data.vendor_part_number}</td>
            <td>{this.data.vendor_description}</td>
        </tr>;
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 0,
            minPrice: 0,
            maxPrice: 0,
            average: 0
        };

        this.renderTable = this.renderTable.bind(this);
    }

    // загрузка данных
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({
                products: data,
                minPrice: Math.min.apply(null, data.map(p => p.price)),
                maxPrice: Math.max.apply(null, data.map(p => p.price)),
                average: data.map(p => p.price).reduce((previous, current) => current += previous) / data.length
            });
            this.setState({
            });
            this.forceUpdate();
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    getClassName = (price, avg) => {
        if (price > avg * 1.2)
            return "danger";
        if (price < avg * 0.8)
            return "info";
        return "light";
    }
    renderTable(product) {
        return <Product key={product.part_number} product={product} type={this.getClassName(product.price, this.state.average)} />
    }
    prevPage = () => {
        if ((this.state.page - 1) * 10 >= 0)
            this.setState({ page: this.state.page - 1 });
    }
    nextPage = () => {
        if ((this.state.page + 1) * 10 <= this.state.products.length)
            this.setState({ page: this.state.page + 1 });
    }

    render() {
        return (<div className="p-3">
            <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.products.length}</td>
                        <td>{this.state.minPrice}</td>
                        <td>{this.state.maxPrice}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Suplier</th>
                        <th>Vendor</th>
                        <th>Vendor Id</th>
                        <th>Vendor Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.slice(this.state.page * 10, (this.state.page + 1) * 10).map(this.renderTable)
                    }
                </tbody>
            </table>
            <button onClick={this.prevPage}>Prev page</button>
            <button onClick={this.nextPage}>Next page</button>
        </div>
        );
    }
}

ReactDOM.render(
    <App apiUrl="/api/products" />,
    document.getElementById("content")
);